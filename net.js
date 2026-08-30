// 아티초크버리기 — Firebase RTDB 온라인 동기화.
// 우당탕 동물도장의 js/net.js(호스트 권위 + seq 가드) 패턴을 이 저장소 구조에 맞게 옮긴 버전.
//
// 핵심 원칙:
//  1) 경로는 공유 Firebase 프로젝트 규칙에 따라 항상 `games/artichoke-discard/rooms/<코드>`
//     (7개 자매 게임이 한 프로젝트에 입주하므로 games/<게임id>/... 로 네임스페이스를 나눈다)
//  2) 이 게임은 호스트 권위(host-authority) 구조: 실제 게임 로직(랜덤, 카드 효과 처리)은
//     호스트 탭에서만 실행된다. 게스트는 자신에게 온 화면(뷰)만 그려서 보여주고,
//     자신의 선택은 액션 메시지로 보내기만 한다.
//  3) 쓰기 전 undefined → null 정화 (Firebase는 undefined 값을 거부한다)
//  4) 호스트가 발행하는 상태 동기화는 seq 가드 트랜잭션(writeState)으로 보호한다.
//  5) 게스트→호스트 액션은 플레이어별 슬롯에 단조 증가하는 seq를 붙여 중복 적용을 막는다.
//  6) 새로고침 시 방을 즉시 파괴하지 않는다 — presence는 online 플래그만 갱신하고,
//     재접속 정보는 로컬에 남겨 나중에 이어붙일 수 있게 한다.
import { FIREBASE_CONFIG } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase, ref, get, set, update, onValue, off,
  onDisconnect, runTransaction, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const GAME_ID = "artichoke-discard";
const REJOIN_KEY = `${GAME_ID}_rejoin`;
const ACTION_SEQ_KEY = `${GAME_ID}_action_seq`;

let app = null;
let db = null;
function ensureDb() {
  if (!db) {
    app = initializeApp(FIREBASE_CONFIG);
    db = getDatabase(app);
  }
  return db;
}

// 공유 프로젝트 네임스페이스: games/<게임id>/rooms/<코드>
const roomsPath = (code) => `games/${GAME_ID}/rooms/${code}`;

// ── undefined 정화: 모든 쓰기는 이 함수를 통과시킬 것 ────────────────
export function sanitize(value) {
  if (value === undefined) return null;
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(sanitize);
  const out = {};
  for (const [key, val] of Object.entries(value)) out[key] = sanitize(val);
  return out;
}

export function makeRoomCode(len = 5) {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // 혼동되는 0/O, 1/I 제외
  return Array.from({ length: len }, () => chars[(Math.random() * chars.length) | 0]).join("");
}

// ── 방 생성/참가 ──────────────────────────────────────────────────
// hostPlayer: { id, name } — id는 이 게임의 좌석 규칙(player-1, player-2 ...)을 따르는 것을 권장.
export async function createRoom(hostPlayer) {
  const code = makeRoomCode();
  const room = sanitize({
    seq: 0,
    createdAt: serverTimestamp(),
    hostId: hostPlayer.id,
    phase: "lobby",
    roomConfig: [],
    players: { [hostPlayer.id]: { ...hostPlayer, online: true, isHost: true } },
    views: {},
    actions: {}
  });
  await set(ref(ensureDb(), roomsPath(code)), room);
  saveRejoin({ code, playerId: hostPlayer.id, role: "host" });
  return code;
}

// guestPlayer: { id, name } — id는 클라이언트가 생성한 임시 참가자 id(게스트 고유값).
// 실제 게임 좌석(player-N) 배정은 호스트가 roomConfig/players를 보고 결정한다.
export async function joinRoom(code, guestPlayer) {
  const roomRef = ref(ensureDb(), roomsPath(code));
  const snap = await get(roomRef);
  if (!snap.exists()) throw new Error("방을 찾을 수 없습니다: " + code);
  await update(
    ref(ensureDb(), `${roomsPath(code)}/players/${guestPlayer.id}`),
    sanitize({ ...guestPlayer, online: true, isHost: false })
  );
  saveRejoin({ code, playerId: guestPlayer.id, role: "guest" });
  return snap.val();
}

// ── 상태 동기화: seq 가드 트랜잭션 ──────────────────────────────────
// patch는 room 최상위에 병합될 필드들(예: { phase, roomConfig, views }).
// 호출측이 알고 있던 baseSeq와 서버의 현재 seq가 다르면 포기(committed:false)하고,
// 그 경우 최신 seq/방 데이터를 함께 돌려주므로 재시도할 수 있다.
export async function writeState(code, baseSeq, patch) {
  const result = await runTransaction(ref(ensureDb(), roomsPath(code)), (cur) => {
    if (!cur) return cur; // 방이 없으면 그대로 반환(트랜잭션 중단)
    if ((cur.seq || 0) !== baseSeq) return undefined; // 이미 앞선 쓰기가 있음 → 포기
    return { ...cur, ...sanitize(patch), seq: baseSeq + 1 };
  });
  return {
    committed: result.committed,
    seq: result.snapshot.val()?.seq ?? baseSeq,
    room: result.snapshot.val()
  };
}

// 로비 단계 등 호스트가 유일한 쓰기 주체이고 경합이 없는 값은 seq 가드 없이 갱신해도 안전하다.
export async function updateRoom(code, patch) {
  await update(ref(ensureDb(), roomsPath(code)), sanitize(patch));
}

// ── 게스트 → 호스트 액션 ────────────────────────────────────────────
// 플레이어별로 하나의 슬롯만 사용한다(현재 진행 중인 선택은 항상 하나뿐이므로 큐가 필요 없다).
// seq는 클라이언트가 로컬에서 단조 증가시켜 붙이므로, 호스트는 이미 처리한 seq보다
// 큰 액션만 적용하면 재전송/중복 이벤트를 안전하게 무시할 수 있다.
function nextActionSeq(code, playerId) {
  const key = `${ACTION_SEQ_KEY}:${code}:${playerId}`;
  const next = (Number(sessionStorage.getItem(key)) || 0) + 1;
  try { sessionStorage.setItem(key, String(next)); } catch (e) { /* 저장 실패는 무시 */ }
  return next;
}

export async function sendAction(code, playerId, kind, payload = {}) {
  const seq = nextActionSeq(code, playerId);
  await set(ref(ensureDb(), `${roomsPath(code)}/actions/${playerId}`), sanitize({
    seq, kind, payload, ts: Date.now()
  }));
  return seq;
}

// ── 구독 ────────────────────────────────────────────────────────
// onRoom은 방 전체(로비 명단, 액션, 호스트 전용 views 포함)를 받는다 — 호스트가 사용.
export function subscribeRoom(code, onRoom) {
  const r = ref(ensureDb(), roomsPath(code));
  const handler = (snap) => onRoom(snap.val());
  onValue(r, handler);
  return () => off(r, "value", handler);
}

// onView는 자신의 뷰 하나만 구독한다 — 게스트가 사용(다른 사람 손패 경로를 굳이 구독하지 않는다).
export function subscribeView(code, playerId, onView) {
  const r = ref(ensureDb(), `${roomsPath(code)}/views/${playerId}`);
  const handler = (snap) => onView(snap.val());
  onValue(r, handler);
  return () => off(r, "value", handler);
}

// ── presence ────────────────────────────────────────────────────
// 즉시 삭제하지 않고 online 플래그만 내린다. 방 정리는 호스트가 "전원 오프라인 +
// 유예시간 경과"를 판단해 수행해야 한다(이 파일은 그 정책까지는 강제하지 않는다).
export function setupPresence(code, playerId) {
  const p = ref(ensureDb(), `${roomsPath(code)}/players/${playerId}`);
  update(p, { online: true, lastSeen: serverTimestamp() });
  onDisconnect(p).update({ online: false, lastSeen: serverTimestamp() });
}

// ── 재접속 ──────────────────────────────────────────────────────
export function saveRejoin(info) {
  try { localStorage.setItem(REJOIN_KEY, JSON.stringify(info)); } catch (e) { /* 무시 */ }
}
export function loadRejoin() {
  try { return JSON.parse(localStorage.getItem(REJOIN_KEY)); } catch (e) { return null; }
}
export function clearRejoin() {
  try { localStorage.removeItem(REJOIN_KEY); } catch (e) { /* 무시 */ }
}
export async function tryRejoin() {
  const info = loadRejoin();
  if (!info) return null;
  const snap = await get(ref(ensureDb(), roomsPath(info.code)));
  if (!snap.exists()) {
    clearRejoin();
    return null;
  }
  return { ...info, room: snap.val() };
}

window.ArtichokeNet = {
  sanitize, makeRoomCode,
  createRoom, joinRoom,
  writeState, updateRoom,
  sendAction,
  subscribeRoom, subscribeView,
  setupPresence,
  saveRejoin, loadRejoin, clearRejoin, tryRejoin
};
