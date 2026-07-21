"use strict";

const CARD_LIBRARY = {
  artichoke: {
    name: "아티초크",
    english: "ARTICHOKE",
    art: "assets/cards/artichoke.png",
    accent: "#708b4f",
    text: "이 카드는 단독으로 낼 수 없습니다.",
    type: "junk"
  },
  eggplant: {
    name: "가지",
    english: "EGGPLANT",
    art: "assets/cards/eggplant.png",
    accent: "#76509b",
    text: "아티초크 1장과 이 카드를 묻습니다. 각 플레이어는 손에서 카드 2장을 골라 왼쪽 플레이어에게 넘깁니다.",
    type: "vegetable"
  },
  potato: {
    name: "감자",
    english: "POTATO",
    art: "assets/cards/potato.png",
    accent: "#b88f52",
    text: "내 카드 더미 맨 위 카드를 공개합니다. 아티초크라면 묻고, 아니면 버립니다.",
    type: "vegetable"
  },
  carrot: {
    name: "당근",
    english: "CARROT",
    art: "assets/cards/carrot.png",
    accent: "#d97632",
    text: "아티초크 2장과 이 카드를 묻습니다. 같은 차례에 다른 카드를 낼 수 없습니다.",
    type: "vegetable"
  },
  leek: {
    name: "리크",
    english: "LEEK",
    art: "assets/cards/leek.png",
    accent: "#5a9270",
    text: "상대 카드 더미 맨 위 카드를 공개해 내 손으로 가져오거나 그 상대의 버린 카드 더미에 놓습니다.",
    type: "vegetable"
  },
  broccoli: {
    name: "브로콜리",
    english: "BROCCOLI",
    art: "assets/cards/broccoli.png",
    accent: "#4f8a5b",
    text: "손에 아티초크가 3장 이상이라면 아티초크 1장을 묻습니다.",
    type: "vegetable"
  },
  beet: {
    name: "비트",
    english: "BEET",
    art: "assets/cards/beet.png",
    accent: "#b83a62",
    text: "나와 상대의 손에서 무작위 카드 1장씩 공개합니다. 둘 다 아티초크면 묻고, 아니면 맞바꿉니다.",
    type: "vegetable"
  },
  peas: {
    name: "완두콩",
    english: "PEAS",
    art: "assets/cards/peas.png",
    accent: "#75a849",
    text: "정원 카드 더미에서 2장을 공개합니다. 1장은 내 버림 더미에, 나머지는 상대 버림 더미에 놓습니다.",
    type: "vegetable"
  },
  onion: {
    name: "양파",
    english: "ONIONS",
    art: "assets/cards/onion.png",
    accent: "#8a6ec9",
    text: "아티초크 1장을 묻은 뒤 이 카드를 다른 플레이어의 버린 카드 더미에 놓습니다.",
    type: "vegetable"
  },
  corn: {
    name: "옥수수",
    english: "CORN",
    art: "assets/cards/corn.png",
    accent: "#d99b2b",
    text: "아티초크 1장과 이 카드를 묻고, 정원 카드 1장을 내 카드 더미 맨 위에 놓습니다.",
    type: "vegetable"
  },
  pepper: {
    name: "피망",
    english: "PEPPER",
    art: "assets/cards/pepper.png",
    accent: "#c85b47",
    text: "내 버린 카드 더미의 카드 1장을 골라 내 카드 더미 맨 위에 올립니다.",
    type: "vegetable"
  },
  rhubarb: {
    name: "루바브",
    english: "RHUBARB",
    art: "assets/cards/rhubarb.png",
    accent: "#c95359",
    text: "이 카드를 묻고 정원을 모두 교체한 뒤 카드 1장을 수확합니다.",
    type: "vegetable"
  }
};

const BASE_GARDEN_CARD_IDS = Object.keys(CARD_LIBRARY).filter((id) => id !== "artichoke");

Object.assign(CARD_LIBRARY, {
  tomato: { name: "토마토", english: "TOMATO", art: "assets/cards/wild/tomato.png", accent: "#ce554b", text: "내 덱 위 3장을 공개합니다. 원하는 1장은 덱 위에, 나머지는 버립니다.", type: "vegetable", expansion: true },
  cabbage: { name: "양배추", english: "CABBAGE", art: "assets/cards/wild/cabbage.png", accent: "#75a864", text: "손의 아티초크를 가능한 만큼, 최대 2장 덱 아래에 놓고 같은 수만큼 뽑습니다.", type: "vegetable", expansion: true },
  turnip: { name: "순무", english: "TURNIP", art: "assets/cards/wild/turnip.png", accent: "#ad718c", text: "손의 아티초크 1장을 버리고 내 버림 더미의 채소 1장을 손으로 가져옵니다.", type: "vegetable", expansion: true },
  garlic: { name: "마늘", english: "GARLIC", art: "assets/cards/wild/garlic.png", accent: "#b8a98b", text: "나와 상대의 손에서 무작위로 1장씩 공개합니다. 둘 다 아티초크가 아니면 버리고, 그렇지 않으면 교환합니다.", type: "vegetable", expansion: true },
  mushroom: { name: "버섯", english: "MUSHROOM", art: "assets/cards/wild/mushroom.png", accent: "#8c6755", text: "이 카드를 묻고, 지금 사용할 수 있는 내 버린 채소 1장의 효과를 비용까지 그대로 실행합니다.", type: "vegetable", expansion: true },
  cauliflower: { name: "콜리플라워", english: "CAULIFLOWER", art: "assets/cards/wild/cauliflower.png", accent: "#d5cba8", text: "이번 차례에 다른 채소 2장 이상을 냈다면 손의 아티초크 1장을 묻습니다.", type: "vegetable", expansion: true },
  pumpkin: { name: "호박", english: "PUMPKIN", art: "assets/cards/wild/pumpkin.png", accent: "#d68a38", text: "심기(내 앞에 호박 중복 불가). 다음 내 차례 시작에 정원 카드 1장을 추가 수확하고 이 카드를 버립니다.", type: "vegetable", expansion: true },
  bean_sprouts: { name: "콩나물", english: "BEAN SPROUTS", art: "assets/cards/wild/bean-sprouts.png", accent: "#9dbb72", text: "내 덱 위 2장을 공개합니다. 아티초크가 있으면 1장을 손에 넣고, 없다면 원하는 1장을 손에 넣습니다. 나머지는 버립니다.", type: "vegetable", expansion: true },
  asparagus: { name: "아스파라거스", english: "ASPARAGUS", art: "assets/cards/wild/asparagus.png", accent: "#4b8c62", text: "심기(내 앞에 아스파라거스 중복 불가). 다음 내 차례 시작에 손의 아티초크 1장을 묻고 이 카드를 버립니다.", type: "vegetable", expansion: true },
  sweet_potato: { name: "고구마", english: "SWEET POTATO", art: "assets/cards/wild/sweet-potato.png", accent: "#9b654f", text: "심기(내 앞에 고구마 중복 불가). 다음 내 차례 시작에 덱 위 3장 중 채소가 있으면 1장을 손에 넣고 이 카드를 버립니다.", type: "vegetable", expansion: true },
  wasabi: { name: "와사비", english: "WASABI", art: "assets/cards/wild/wasabi.png", accent: "#7aab4c", text: "나를 제외한 모든 플레이어에게 예약합니다(대상별 와사비 중복 불가). 다음 차례 채소를 최대 2장만 쓰며, 모두 발동한 뒤 이 카드를 버립니다.", type: "vegetable", expansion: true },
  cucumber: { name: "오이", english: "CUCUMBER", art: "assets/cards/wild/cucumber.png", accent: "#4f9c70", text: "나를 제외한 모든 플레이어에게 예약합니다(대상별 오이 중복 불가). 다음 차례 수확 카드가 무작위로 정해지며, 모두 발동한 뒤 이 카드를 버립니다.", type: "vegetable", expansion: true },
  brussels_sprout: { name: "방울양배추", english: "BRUSSELS SPROUT", art: "assets/cards/wild/brussels-sprout.png", accent: "#5d8d4e", text: "나를 제외한 모든 플레이어에게 예약합니다(대상별 중복 불가). 다음 차례 시작에 무작위 패 1장을 버리고 1장 뽑으며, 모두 발동한 뒤 이 카드를 버립니다.", type: "vegetable", expansion: true },
  celery: { name: "셀러리", english: "CELERY", art: "assets/cards/wild/celery.png", accent: "#79a96c", text: "상대 덱 위 2장을 공개하고 원하는 순서로 되돌립니다.", type: "vegetable", expansion: true },
  parsley: { name: "파슬리", english: "PARSLEY", art: "assets/cards/wild/parsley.png", accent: "#4f8a4d", text: "손에 있으면 새 와사비·오이·방울양배추와 리크·셀러리·치커리의 직접 방해를 무효화합니다. 교환·전달 효과와 이미 예약된 방해는 막지 않습니다. 사용하면 내 덱 위 1장을 유지하거나 버립니다.", type: "vegetable", expansion: true },
  chicory: { name: "치커리", english: "CHICORY", art: "assets/cards/wild/chicory.png", accent: "#6c79a9", text: "손에 아티초크가 2장 이하인 모든 플레이어는 묻은 아티초크 1장을 손으로 되돌립니다.", type: "vegetable", expansion: true }
});

const EXPANSION_CARD_IDS = Object.keys(CARD_LIBRARY).filter((id) => CARD_LIBRARY[id].expansion);
const ALL_GARDEN_CARD_IDS = [...BASE_GARDEN_CARD_IDS, ...EXPANSION_CARD_IDS];
const MUSHROOM_COPY_IDS = ["potato", "leek", "broccoli", "beet", "peas", "tomato", "bean_sprouts", "celery", "parsley", "chicory"];
const GARDEN_CARD_IDS = [...BASE_GARDEN_CARD_IDS];
const PARSLEY_BLOCKED_EFFECT_IDS = new Set(["leek", "wasabi", "cucumber", "brussels_sprout", "celery", "chicory"]);
const COMPACT_RULES = {
  artichoke: "단독으로 낼 수 없습니다.",
  eggplant: "아티초크 1장과 묻고, 모두 왼쪽에 카드 2장을 넘깁니다.",
  potato: "내 덱 맨 위를 공개해 아티초크면 묻고, 아니면 버립니다.",
  carrot: "아티초크 2장과 함께 묻습니다. 이번 턴에는 다른 카드를 낼 수 없습니다.",
  leek: "상대 덱 맨 위를 공개해 내 손이나 상대 버림 더미로 보냅니다.",
  broccoli: "손에 아티초크가 3장 이상이면 1장을 묻습니다.",
  beet: "서로 무작위 1장을 공개해 둘 다 아티초크면 묻고, 아니면 교환합니다.",
  peas: "정원 덱 2장을 공개해 나와 상대 버림 더미에 1장씩 놓습니다.",
  onion: "아티초크 1장을 묻고, 양파는 상대 버림 더미로 보냅니다.",
  corn: "아티초크와 함께 묻고, 정원 카드 1장을 내 덱 위에 놓습니다.",
  pepper: "내 버림 더미 카드 1장을 골라 덱 위에 놓습니다.",
  rhubarb: "이 카드를 묻고 정원을 모두 교체한 뒤 1장을 수확합니다."
};
EXPANSION_CARD_IDS.forEach((id) => {
  COMPACT_RULES[id] = CARD_LIBRARY[id].text;
});
Object.assign(COMPACT_RULES, {
  tomato: "덱 위 3장: 원하는 1장은 위로, 나머지는 버립니다.",
  cabbage: "아티초크를 가능한 만큼, 최대 2장 덱 아래로 보내고 그만큼 뽑습니다.",
  turnip: "아티초크 1장을 버리고, 버린 채소 1장을 손으로 가져옵니다.",
  garlic: "서로 무작위 1장 공개. 둘 다 채소면 버리고, 아니면 교환합니다.",
  mushroom: "묻기. 지금 사용 가능한 버린 채소 1장의 효과와 비용을 복사합니다.",
  cauliflower: "이번 턴 채소 2장 뒤 사용: 아티초크 1장을 묻습니다.",
  pumpkin: "심기(내 앞에 동일 카드 중복 불가). 다음 내 턴에 추가 수확 후 버립니다.",
  bean_sprouts: "덱 위 2장: 아티초크 우선, 없으면 1장을 고릅니다.",
  asparagus: "심기(내 앞에 동일 카드 중복 불가). 다음 내 턴에 아티초크 1장을 묻고 버립니다.",
  sweet_potato: "심기(내 앞에 동일 카드 중복 불가). 다음 내 턴 덱 위 3장에 채소가 있으면 1장을 얻습니다.",
  wasabi: "모든 상대에게 예약(대상별 중복 불가). 다음 턴 채소 2장 제한.",
  cucumber: "모든 상대에게 예약(대상별 중복 불가). 다음 수확 무작위.",
  brussels_sprout: "모든 상대에게 예약(대상별 중복 불가). 다음 턴 패 1장 교체.",
  celery: "상대 덱 위 2장을 원하는 순서로 되돌립니다.",
  parsley: "손에 있으면 직접 방해 무효(교환·전달·기예약 제외). 사용: 덱 위 1장 유지/버림.",
  chicory: "패에 아티초크 2장 이하인 모두가 묻은 1장을 되찾습니다."
});

const SPECIAL_RULES = {
  abundant: { name: "풍년", text: "정원 줄을 7장으로 유지합니다." },
  small_garden: { name: "작은 텃밭", text: "정원 줄이 3장뿐입니다." },
  market_day: { name: "장날", text: "수확할 때 정원 줄에서 카드 2장을 골라 모두 손에 넣습니다." },
  crop_rotation: { name: "돌려짓기", text: "라운드가 끝날 때마다 정원 줄을 모두 교체합니다." },
  compost_bonus: { name: "퇴비 보너스", text: "각 차례에 처음 카드를 묻으면 카드 1장을 뽑습니다." },
  mutual_aid: { name: "품앗이", text: "각 차례 첫 채소는 효과 후 왼쪽 플레이어의 버림 더미로 갑니다." },
  big_basket: { name: "큰 바구니", text: "차례 종료 시 6장을 뽑고 그 6장으로 승리를 확인합니다." },
  impulse_buying: { name: "충동구매", text: "수확 후 정원 카드 1장을 더 얻고 손패 1장을 버립니다." },
  overgrown: { name: "잡초가 무성한 정원", text: "아티초크 13장으로 시작합니다." },
  artichoke_boom: { name: "아티초크 대폭발", text: "아티초크 18장으로 시작해 10라운드 후 가장 적은 사람이 승리합니다.", rounds: 10, scoreRace: true },
  spreading_weeds: { name: "번지는 잡초", text: "라운드 종료 시 모두의 버림 더미에 아티초크 1장이 추가됩니다." },
  pass_weeds: { name: "잡초 떠넘기기", text: "한 효과로 아티초크를 2장 이상 묻으면 상대에게 아티초크 1장을 줍니다." },
  endless_weeds: { name: "끝없는 잡초", text: "라운드 종료 시 가장 적게 묻은 플레이어가 아티초크 1장을 받습니다." },
  cleanup_race: { name: "정리 경쟁", text: "즉시 승리 없이 8라운드 후 아티초크가 가장 적은 사람이 승리합니다.", rounds: 8, scoreRace: true }
};
const compactCardQuery = window.matchMedia("(max-width: 700px)");

const state = {
  players: [],
  roomConfig: [],
  gameOptions: { mode: "classic", specialRuleId: null },
  expansionCardIds: [],
  matchGardenCardIds: [],
  gardenDeck: [],
  garden: [],
  currentPlayerId: null,
  phase: "harvest",
  gameOver: false,
  winnerId: null,
  turn: 1,
  sound: true,
  actionPending: false,
  handoffPending: false,
  visibleHandPlayerId: null,
  turnLocked: false,
  cardsPlayedThisTurn: 0,
  firstBuryBonusUsed: false,
  statusSequence: 0
};

let customSetup = {
  specialRuleId: null,
  gardenCardIds: [...BASE_GARDEN_CARD_IDS]
};
let customDraft = null;

const els = {
  titleScreen: document.querySelector("#titleScreen"),
  gameShell: document.querySelector("#gameShell"),
  playerCountControl: document.querySelector("#playerCountControl"),
  roomSlots: document.querySelector("#roomSlots"),
  roomError: document.querySelector("#roomError"),
  startGame: document.querySelector("#startGameBtn"),
  gameModeControl: document.querySelector("#gameModeControl"),
  customSetupSummary: document.querySelector("#customSetupSummary"),
  customSummaryTitle: document.querySelector("#customSummaryTitle"),
  customSummaryText: document.querySelector("#customSummaryText"),
  openCustomSetup: document.querySelector("#openCustomSetupBtn"),
  customSetupDialog: document.querySelector("#customSetupDialog"),
  closeCustomSetup: document.querySelector("#closeCustomSetupBtn"),
  cancelCustomSetup: document.querySelector("#cancelCustomSetupBtn"),
  applyCustomSetup: document.querySelector("#applyCustomSetupBtn"),
  customRuleSelect: document.querySelector("#customRuleSelect"),
  customRuleDescription: document.querySelector("#customRuleDescription"),
  customVegetableGrid: document.querySelector("#customVegetableGrid"),
  customVegetableCount: document.querySelector("#customVegetableCount"),
  customBasePreset: document.querySelector("#customBasePresetBtn"),
  customRandomPreset: document.querySelector("#customRandomPresetBtn"),
  customSetupError: document.querySelector("#customSetupError"),
  playerPanels: document.querySelector("#playerPanels"),
  opponentSeats: document.querySelector("#opponentSeats"),
  garden: document.querySelector("#garden"),
  hand: document.querySelector("#hand"),
  endTurn: document.querySelector("#endTurnBtn"),
  newGame: document.querySelector("#newGameBtn"),
  help: document.querySelector("#helpBtn"),
  helpDialog: document.querySelector("#helpDialog"),
  compactLog: document.querySelector("#compactLogBtn"),
  logPanel: document.querySelector(".log-panel"),
  logList: document.querySelector("#logList"),
  turnBadge: document.querySelector("#turnBadge"),
  phaseText: document.querySelector("#phaseText"),
  statusText: document.querySelector("#statusText"),
  wildRuleBanner: document.querySelector("#wildRuleBanner"),
  gardenHint: document.querySelector("#gardenHint"),
  handHint: document.querySelector("#handHint"),
  handOwnerName: document.querySelector("#handOwnerName"),
  sound: document.querySelector("#soundBtn"),
  toast: document.querySelector("#toast"),
  gardenDeckCount: document.querySelector("#gardenDeckCount"),
  activeDeckStack: document.querySelector("#activeDeckStack"),
  activeDiscardStack: document.querySelector("#activeDiscardStack"),
  activeBuriedStack: document.querySelector("#activeBuriedStack"),
  phaseSteps: [...document.querySelectorAll(".phase-track [data-step]")],
  table: document.querySelector(".table"),
  choiceDialog: document.querySelector("#choiceDialog"),
  choiceTitle: document.querySelector("#choiceTitle"),
  choiceMessage: document.querySelector("#choiceMessage"),
  choiceOptions: document.querySelector("#choiceOptions"),
  choiceConfirm: document.querySelector("#choiceConfirmBtn"),
  effectLayer: document.querySelector("#effectLayer"),
  effectScene: document.querySelector("#effectScene"),
  effectEyebrow: document.querySelector("#effectEyebrow"),
  effectTitle: document.querySelector("#effectTitle"),
  effectMessage: document.querySelector("#effectMessage"),
  effectCards: document.querySelector("#effectCards"),
  handZone: document.querySelector(".hand-zone"),
  handoffDialog: document.querySelector("#handoffDialog"),
  handoffPlayerName: document.querySelector("#handoffPlayerName"),
  handoffMessage: document.querySelector("#handoffMessage"),
  handoffConfirm: document.querySelector("#handoffConfirmBtn"),
  resultDialog: document.querySelector("#resultDialog"),
  resultWinnerName: document.querySelector("#resultWinnerName"),
  resultSummary: document.querySelector("#resultSummary"),
  resultList: document.querySelector("#resultList"),
  resultRematch: document.querySelector("#resultRematchBtn"),
  resultLobby: document.querySelector("#resultLobbyBtn"),
  matchCardsDialog: document.querySelector("#matchCardsDialog"),
  matchCardsModeLabel: document.querySelector("#matchCardsModeLabel"),
  matchCardsRule: document.querySelector("#matchCardsRule"),
  matchCardsGrid: document.querySelector("#matchCardsGrid"),
  matchCardsConfirm: document.querySelector("#matchCardsConfirmBtn")
};

let toastTimer = 0;
let audioCtx = null;
let musicTimer = 0;
let lastPlayerVisualState = new Map();
let musicStep = 0;
let autoTurnTimer = 0;
let privateHandoffResolver = null;

// 온라인 모드에서는 서버가 제공하는 난수 함수로 이 경계만 교체하면 됩니다.
function randomValue() {
  return Math.random();
}

function shuffle(cards) {
  const copy = [...cards];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(randomValue() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function makePlayer({ id, name, seat, controller, artichokeCount = 10 }) {
  const player = {
    id,
    name,
    seat,
    controller,
    deck: shuffle(Array(artichokeCount).fill("artichoke")),
    hand: [],
    discard: [],
    buried: [],
    played: [],
    statuses: []
  };
  drawCards(player, 5);
  return player;
}

function setupGame(playerConfigs, gameOptions = state.gameOptions) {
  if (els.choiceDialog.open) els.choiceDialog.close();
  if (els.handoffDialog.open) els.handoffDialog.close();
  if (els.resultDialog.open) els.resultDialog.close();
  state.roomConfig = playerConfigs.map((config) => ({ ...config }));
  const isCustom = gameOptions.mode === "custom";
  const usesSpecialRule = gameOptions.mode === "rule-only" || gameOptions.mode === "wild-garden";
  const usesExpansion = gameOptions.mode === "wild-garden";
  const selectedRuleId = isCustom
    ? (gameOptions.specialRuleId ?? null)
    : usesSpecialRule ? shuffle(Object.keys(SPECIAL_RULES))[0] : null;
  state.expansionCardIds = [];
  const initialArtichokes = selectedRuleId === "artichoke_boom" ? 18 : selectedRuleId === "overgrown" ? 13 : 10;
  state.players = playerConfigs.map((config, seat) => makePlayer({
    id: `player-${seat + 1}`,
    name: config.name,
    seat,
    controller: config.controller,
    artichokeCount: initialArtichokes
  }));
  const gardenCardIds = isCustom
    ? [...gameOptions.gardenCardIds]
    : usesExpansion
      ? shuffle([...ALL_GARDEN_CARD_IDS]).slice(0, BASE_GARDEN_CARD_IDS.length)
      : [...GARDEN_CARD_IDS];
  state.gameOptions = {
    mode: gameOptions.mode,
    specialRuleId: selectedRuleId,
    gardenCardIds: isCustom ? [...gardenCardIds] : null
  };
  state.expansionCardIds = gardenCardIds.filter((id) => CARD_LIBRARY[id].expansion);
  state.matchGardenCardIds = [...gardenCardIds];
  state.gardenDeck = shuffle(gardenCardIds.flatMap((id) => Array(6).fill(id)));
  state.garden = [];
  state.currentPlayerId = "player-1";
  state.phase = "harvest";
  state.gameOver = false;
  state.winnerId = null;
  state.turn = 1;
  state.statusSequence = 0;
  state.actionPending = false;
  state.handoffPending = false;
  state.visibleHandPlayerId = state.players[0].controller === "local" ? state.players[0].id : null;
  lastPlayerVisualState.clear();
  resetTurnState();
  document.querySelectorAll(".winner").forEach((node) => node.classList.remove("winner"));
  refillGarden();
  els.logList.innerHTML = "";
  log(`보충: 각 플레이어가 아티초크 ${initialArtichokes}장으로 시작합니다.`);
  if (selectedRuleId) {
    const modeName = gameOptions.mode === "wild-garden" ? "별난 텃밭" : gameOptions.mode === "custom" ? "커스텀" : "변칙 규칙";
    log(`${modeName}: ${SPECIAL_RULES[selectedRuleId].name} — ${SPECIAL_RULES[selectedRuleId].text}`);
    if (usesExpansion) log(`27종 후보 중 11종을 뽑았습니다. 신규 채소는 ${state.expansionCardIds.length}종입니다.`);
  }
  if (isCustom) log(`커스텀 채소 11종으로 정원을 만들었습니다. 신규 채소는 ${state.expansionCardIds.length}종입니다.`);
  els.titleScreen.hidden = true;
  els.gameShell.hidden = false;
  if (state.sound) startBackgroundMusic();
  render();
  presentMatchStart();
}

async function presentMatchStart() {
  if (state.gameOptions.specialRuleId) {
    state.actionPending = true;
    render();
    await showSpecialRuleScene(state.gameOptions.specialRuleId, null, 1250);
    state.actionPending = false;
    render();
  }
  if (state.gameOptions.specialRuleId || state.gameOptions.mode === "custom") await showMatchCardsOverview();
  window.setTimeout(flashTurnArrival, 120);
  if (activePlayer().controller === "local") scrollToGameArea(els.table);
  scheduleAutomatedTurn();
}

function showMatchCardsOverview() {
  return new Promise((resolve) => {
    els.matchCardsModeLabel.textContent = state.gameOptions.mode === "wild-garden"
      ? `확장 · 27종 중 11종 무작위 · 신규 ${state.expansionCardIds.length}종`
      : state.gameOptions.mode === "custom"
        ? `커스텀 · 직접 고른 11종 · 신규 ${state.expansionCardIds.length}종`
        : "확장 · 무작위 텃밭 규칙";
    const rule = SPECIAL_RULES[state.gameOptions.specialRuleId];
    els.matchCardsRule.textContent = rule ? `${rule.name} · ${rule.text}` : "판 특수 규칙 없음";
    els.matchCardsGrid.innerHTML = "";
    state.matchGardenCardIds.forEach((cardId) => {
      const card = createCompactCard(cardId, { count: 1 });
      card.disabled = true;
      if (CARD_LIBRARY[cardId].expansion) {
        card.classList.add("expansion-card");
        const badge = document.createElement("span");
        badge.className = "expansion-badge";
        badge.textContent = "신규";
        card.append(badge);
      }
      els.matchCardsGrid.append(card);
    });
    els.matchCardsConfirm.onclick = () => {
      els.matchCardsDialog.close();
      resolve();
    };
    els.matchCardsDialog.showModal();
  });
}

function renderCustomSummary() {
  const rule = SPECIAL_RULES[customSetup.specialRuleId];
  const expansionCount = customSetup.gardenCardIds.filter((id) => CARD_LIBRARY[id].expansion).length;
  els.customSummaryTitle.textContent = `${customSetup.gardenCardIds.length}종 · ${rule?.name ?? "특수 규칙 없음"}`;
  els.customSummaryText.textContent = `기본 ${customSetup.gardenCardIds.length - expansionCount}종 · 신규 ${expansionCount}종`;
}

function setCustomSetupVisibility(mode) {
  els.customSetupSummary.hidden = mode !== "custom";
  if (mode === "custom") renderCustomSummary();
}

function renderCustomRuleDescription() {
  const ruleId = els.customRuleSelect.value || null;
  els.customRuleDescription.textContent = ruleId
    ? SPECIAL_RULES[ruleId].text
    : "기본 승리 조건과 정원 규칙을 그대로 사용합니다.";
}

function renderCustomVegetablePicker() {
  const selected = new Set(customDraft.gardenCardIds);
  els.customVegetableCount.textContent = customDraft.gardenCardIds.length;
  els.customVegetableGrid.innerHTML = "";
  ALL_GARDEN_CARD_IDS.forEach((cardId) => {
    const card = CARD_LIBRARY[cardId];
    const button = document.createElement("button");
    button.type = "button";
    button.className = `custom-vegetable-option${selected.has(cardId) ? " selected" : ""}`;
    button.style.setProperty("--accent", card.accent);
    button.setAttribute("aria-pressed", String(selected.has(cardId)));
    button.setAttribute("aria-label", `${card.name}. ${card.text}`);
    button.innerHTML = `
      <img src="${card.art}" alt="" aria-hidden="true" draggable="false">
      <strong>${card.name}</strong>
      <small>${card.text}</small>
      ${card.expansion ? '<span class="expansion-badge">신규</span>' : ""}
    `;
    button.addEventListener("click", () => {
      const index = customDraft.gardenCardIds.indexOf(cardId);
      if (index >= 0) {
        customDraft.gardenCardIds.splice(index, 1);
      } else if (customDraft.gardenCardIds.length >= BASE_GARDEN_CARD_IDS.length) {
        els.customSetupError.textContent = "채소는 11종까지 선택할 수 있습니다. 다른 채소를 먼저 해제해 주세요.";
        return;
      } else {
        customDraft.gardenCardIds.push(cardId);
      }
      els.customSetupError.textContent = "";
      renderCustomVegetablePicker();
    });
    els.customVegetableGrid.append(button);
  });
}

function openCustomSetupDialog() {
  customDraft = {
    specialRuleId: customSetup.specialRuleId,
    gardenCardIds: [...customSetup.gardenCardIds]
  };
  els.customRuleSelect.value = customDraft.specialRuleId ?? "";
  els.customSetupError.textContent = "";
  renderCustomRuleDescription();
  renderCustomVegetablePicker();
  els.customSetupDialog.showModal();
}

function closeCustomSetupDialog() {
  customDraft = null;
  els.customSetupDialog.close();
}

function applyCustomSetup() {
  if (customDraft.gardenCardIds.length !== BASE_GARDEN_CARD_IDS.length) {
    els.customSetupError.textContent = `채소를 정확히 11종 선택해 주세요. 현재 ${customDraft.gardenCardIds.length}종입니다.`;
    return;
  }
  customSetup = {
    specialRuleId: els.customRuleSelect.value || null,
    gardenCardIds: [...customDraft.gardenCardIds]
  };
  renderCustomSummary();
  closeCustomSetupDialog();
}

function showTitleScreen() {
  window.clearTimeout(autoTurnTimer);
  state.gameOver = true;
  state.actionPending = false;
  if (els.choiceDialog.open) els.choiceDialog.close();
  if (els.handoffDialog.open) els.handoffDialog.close();
  if (els.resultDialog.open) els.resultDialog.close();
  if (els.matchCardsDialog.open) els.matchCardsDialog.close();
  if (state.roomConfig.length > 0) {
    renderRoomSlots(state.roomConfig.length, state.roomConfig);
    els.playerCountControl.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("active", Number(button.dataset.count) === state.roomConfig.length);
    });
  }
  const roomMode = state.gameOptions.mode ?? "classic";
  if (roomMode === "custom" && state.gameOptions.gardenCardIds?.length === BASE_GARDEN_CARD_IDS.length) {
    customSetup = {
      specialRuleId: state.gameOptions.specialRuleId,
      gardenCardIds: [...state.gameOptions.gardenCardIds]
    };
  }
  els.gameModeControl.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === roomMode);
  });
  setCustomSetupVisibility(roomMode);
  els.gameShell.hidden = true;
  els.titleScreen.hidden = false;
  if (state.sound) startBackgroundMusic();
}

function defaultRoomSlot(index) {
  return {
    name: index === 0 ? "플레이어 1" : `AI ${index}`,
    controller: index === 0 ? "local" : "ai"
  };
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;"
  })[character]);
}

function readRoomSlots() {
  return [...els.roomSlots.querySelectorAll(".slot-row")].map((row, index) => ({
    name: row.querySelector("input").value.trim() || `플레이어 ${index + 1}`,
    controller: row.querySelector("select").value
  }));
}

function renderRoomSlots(count, previous = readRoomSlots()) {
  els.roomSlots.innerHTML = "";
  for (let index = 0; index < count; index += 1) {
    const slot = previous[index] ?? defaultRoomSlot(index);
    const row = document.createElement("div");
    row.className = "slot-row";
    row.innerHTML = `
      <span class="seat-number">${index + 1}</span>
      <input type="text" maxlength="12" value="${escapeHtml(slot.name)}" aria-label="${index + 1}번 플레이어 이름">
      <select aria-label="${index + 1}번 플레이어 종류">
        <option value="local"${slot.controller === "local" ? " selected" : ""}>로컬</option>
        <option value="ai"${slot.controller === "ai" ? " selected" : ""}>AI</option>
      </select>
    `;
    row.querySelector("select").addEventListener("change", (event) => {
      const input = row.querySelector("input");
      if (event.target.value === "ai" && /^플레이어 \d+$/.test(input.value)) input.value = `AI ${index + 1}`;
      if (event.target.value === "local" && /^AI \d+$/.test(input.value)) input.value = `플레이어 ${index + 1}`;
      els.roomError.textContent = "";
    });
    els.roomSlots.append(row);
  }
}

function startConfiguredGame() {
  const configs = readRoomSlots();
  if (!configs.some((player) => player.controller === "local")) {
    els.roomError.textContent = "최소 1명은 로컬 플레이어여야 합니다.";
    return;
  }
  if (new Set(configs.map((player) => player.name)).size !== configs.length) {
    els.roomError.textContent = "플레이어 이름을 서로 다르게 설정해 주세요.";
    return;
  }
  els.roomError.textContent = "";
  const mode = els.gameModeControl.querySelector("button.active")?.dataset.mode ?? "classic";
  setupGame(configs, mode === "custom"
    ? {
      mode,
      specialRuleId: customSetup.specialRuleId,
      gardenCardIds: [...customSetup.gardenCardIds]
    }
    : { mode });
}

function resetTurnState() {
  state.turnLocked = false;
  state.cardsPlayedThisTurn = 0;
  state.firstBuryBonusUsed = false;
}

function playerById(id) {
  return state.players.find((player) => player.id === id);
}

function activePlayer() {
  return playerById(state.currentPlayerId);
}

function opponentsOf(player) {
  return state.players.filter((candidate) => candidate.id !== player.id);
}

function leftPlayerOf(player) {
  const seats = [...state.players].sort((a, b) => a.seat - b.seat);
  const index = seats.findIndex((candidate) => candidate.id === player.id);
  return seats[(index + 1) % seats.length];
}

function refillGarden() {
  const targetSize = state.gameOptions.specialRuleId === "abundant" ? 7 : state.gameOptions.specialRuleId === "small_garden" ? 3 : 5;
  while (state.garden.length < targetSize && state.gardenDeck.length > 0) {
    state.garden.push(state.gardenDeck.pop());
  }
}

function prepareDeck(player) {
  if (player.deck.length > 0) return true;
  if (player.discard.length === 0) return false;
  player.deck = shuffle(player.discard);
  player.discard = [];
  log(`${player.name}의 버린 카드 더미를 섞어 새 카드 더미를 만들었습니다.`);
  return true;
}

function takeTopCard(player) {
  return prepareDeck(player) ? player.deck.pop() : null;
}

function drawCards(player, count) {
  const drawn = [];
  for (let i = 0; i < count; i += 1) {
    const card = takeTopCard(player);
    if (!card) break;
    player.hand.push(card);
    drawn.push(card);
  }
  return drawn;
}

function availableDrawCount(player) {
  return player.deck.length + player.discard.length;
}

function countArtichokes(player) {
  return [...player.deck, ...player.hand, ...player.discard].filter((id) => id === "artichoke").length;
}

function removeFirst(cards, id) {
  const index = cards.indexOf(id);
  if (index >= 0) cards.splice(index, 1);
  return index >= 0;
}

function moveCard(source, target, id) {
  if (!removeFirst(source, id)) return false;
  target.push(id);
  return true;
}

function removeCardsAt(cards, indices) {
  return [...indices]
    .sort((a, b) => b - a)
    .map((index) => cards.splice(index, 1)[0])
    .reverse();
}

function withJosa(word, batchimJosa, noBatchimJosa) {
  const last = word.charCodeAt(word.length - 1);
  const hasBatchim = last >= 0xac00 && last <= 0xd7a3 && (last - 0xac00) % 28 !== 0;
  return `${word}${hasBatchim ? batchimJosa : noBatchimJosa}`;
}

function subject(word) {
  return word === "나" ? "내가" : withJosa(word, "이", "가");
}

function object(word) {
  return withJosa(word, "을", "를");
}

function topic(word) {
  return withJosa(word, "은", "는");
}

function log(message) {
  const item = document.createElement("li");
  item.textContent = message;
  els.logList.prepend(item);
  while (els.logList.children.length > 24) els.logList.lastElementChild.remove();
  showToast(message);
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  toastTimer = window.setTimeout(() => els.toast.classList.remove("show"), 1900);
}

function pulseTable(tone = "tick") {
  els.table.classList.remove("bump");
  void els.table.offsetWidth;
  els.table.classList.add("bump");
  playSound(tone);
}

function ensureAudioContext() {
  audioCtx ??= new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playTone(frequency, duration, volume, type = "sine", delay = 0) {
  if (!state.sound) return;
  const context = ensureAudioContext();
  const now = context.currentTime + delay;
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + Math.min(0.025, duration * 0.2));
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.connect(gain).connect(context.destination);
  osc.start(now);
  osc.stop(now + duration + 0.04);
}

function playSound(tone = "tick") {
  if (!state.sound) return;
  const sequences = {
    tick: [[440, 0, 0.07, 0.035, "triangle"]],
    harvest: [[523.25, 0, 0.1, 0.045, "triangle"], [659.25, 0.07, 0.13, 0.035, "sine"]],
    play: [[392, 0, 0.08, 0.045, "triangle"], [783.99, 0.055, 0.11, 0.035, "triangle"]],
    reveal: [[329.63, 0, 0.13, 0.035, "sine"], [493.88, 0.09, 0.18, 0.035, "sine"]],
    bury: [[246.94, 0, 0.15, 0.045, "triangle"], [164.81, 0.12, 0.22, 0.04, "sine"]],
    transfer: [[392, 0, 0.1, 0.035, "triangle"], [587.33, 0.08, 0.1, 0.035, "triangle"], [440, 0.16, 0.14, 0.03, "triangle"]],
    draw: [[392, 0, 0.08, 0.03, "triangle"], [523.25, 0.07, 0.08, 0.03, "triangle"], [659.25, 0.14, 0.13, 0.03, "triangle"]],
    win: [[523.25, 0, 0.22, 0.055, "triangle"], [659.25, 0.13, 0.24, 0.05, "triangle"], [783.99, 0.26, 0.28, 0.05, "triangle"], [1046.5, 0.42, 0.5, 0.045, "sine"]]
  };
  (sequences[tone] ?? sequences.tick).forEach(([frequency, delay, duration, volume, type]) => {
    playTone(frequency, duration, volume, type, delay);
  });
}

function playMusicBeat() {
  if (!state.sound || !audioCtx) return;
  const melody = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23];
  const bass = [130.81, 146.83, 164.81, 146.83];
  playTone(melody[musicStep % melody.length], 0.48, 0.012, "sine");
  if (musicStep % 2 === 0) playTone(bass[Math.floor(musicStep / 2) % bass.length], 0.72, 0.009, "triangle");
  musicStep += 1;
}

function startBackgroundMusic() {
  if (!state.sound || musicTimer) return;
  ensureAudioContext();
  playMusicBeat();
  musicTimer = window.setInterval(playMusicBeat, 620);
}

function stopBackgroundMusic() {
  window.clearInterval(musicTimer);
  musicTimer = 0;
  musicStep = 0;
}

function soundForEffect(variant) {
  if (["reveal", "reveal-pair", "fan", "rule-trigger"].includes(variant)) return "reveal";
  if (variant === "bury") return "bury";
  if (["transfer", "swap-pair"].includes(variant)) return "transfer";
  if (variant === "move-deck") return "draw";
  return null;
}

function motionTime(milliseconds) {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 20 : milliseconds;
}

function waitForMotion(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, motionTime(milliseconds)));
}

function scrollToGameArea(element) {
  if (!compactCardQuery.matches || !element) return;
  window.setTimeout(() => {
    element.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  }, motionTime(90));
}

async function showEffectScene({
  eyebrow = "카드 효과",
  title,
  message = "",
  cards = [],
  variant = "reveal",
  duration = 850
}) {
  render();
  els.toast.classList.remove("show");
  const effectSound = soundForEffect(variant);
  if (effectSound) playSound(effectSound);
  els.effectScene.className = `effect-scene ${variant}`;
  els.effectEyebrow.textContent = eyebrow;
  els.effectTitle.textContent = title;
  els.effectMessage.textContent = message;
  els.effectCards.innerHTML = "";

  cards.forEach((entry, index) => {
    const spec = typeof entry === "string" ? { id: entry } : entry;
    const wrapper = document.createElement("div");
    wrapper.className = `effect-card-wrap ${spec.className ?? ""}`.trim();
    wrapper.style.setProperty("--effect-index", index);
    wrapper.style.setProperty("--effect-rotate", `${(index - (cards.length - 1) / 2) * 3}deg`);
    if (spec.label) {
      const label = document.createElement("small");
      label.textContent = spec.label;
      wrapper.append(label);
    }
    const card = createCard(spec.id);
    card.disabled = true;
    wrapper.append(card);
    els.effectCards.append(wrapper);
  });

  els.effectLayer.hidden = false;
  els.effectLayer.classList.remove("is-leaving");
  void els.effectLayer.offsetWidth;
  els.effectLayer.classList.add("is-visible");
  await waitForMotion(duration);
  els.effectLayer.classList.add("is-leaving");
  await waitForMotion(180);
  els.effectLayer.classList.remove("is-visible", "is-leaving");
  els.effectLayer.hidden = true;
  els.effectCards.innerHTML = "";
}

async function showSpecialRuleScene(ruleId, message = null, duration = 800) {
  const rule = SPECIAL_RULES[ruleId];
  if (!rule) return;
  const modeName = state.gameOptions.mode === "wild-garden"
    ? "별난 텃밭"
    : state.gameOptions.mode === "custom" ? "커스텀" : "변칙 규칙";
  await showEffectScene({
    eyebrow: `${modeName} · 특수 규칙`,
    title: rule.name,
    message: message ?? rule.text,
    cards: [],
    variant: "rule-trigger",
    duration
  });
}

async function showDrawScene(player, count) {
  render();
  els.toast.classList.remove("show");
  playSound("draw");
  els.effectScene.className = `effect-scene ${player.controller === "local" ? "draw-local" : "draw-ai"}`;
  els.effectEyebrow.textContent = "뽑기";
  els.effectTitle.textContent = `${player.name} 손패 채우기`;
  els.effectMessage.textContent = `카드 ${count}장을 카드 더미에서 가져옵니다.`;
  els.effectCards.innerHTML = "";
  for (let index = 0; index < count; index += 1) {
    const back = document.createElement("span");
    back.className = "effect-draw-card";
    back.style.setProperty("--effect-index", index);
    back.style.setProperty("--effect-rotate", `${(index - (count - 1) / 2) * 4}deg`);
    els.effectCards.append(back);
  }
  els.effectLayer.hidden = false;
  els.effectLayer.classList.remove("is-leaving");
  void els.effectLayer.offsetWidth;
  els.effectLayer.classList.add("is-visible");
  await waitForMotion(760 + count * 90);
  els.effectLayer.classList.add("is-leaving");
  await waitForMotion(160);
  els.effectLayer.classList.remove("is-visible", "is-leaving");
  els.effectLayer.hidden = true;
  els.effectCards.innerHTML = "";
}

function flashTurnArrival() {
  if (state.gameOver || state.handoffPending || activePlayer()?.controller !== "local") return;
  els.handZone.classList.remove("turn-arrival");
  void els.handZone.offsetWidth;
  els.handZone.classList.add("turn-arrival");
  window.setTimeout(() => els.handZone.classList.remove("turn-arrival"), motionTime(1400));
}

function prepareTurnVisibility(player) {
  if (player.controller !== "local") return;
  const localCount = state.players.filter((candidate) => candidate.controller === "local").length;
  if (localCount > 1) {
    state.handoffPending = true;
    state.visibleHandPlayerId = null;
  } else {
    state.visibleHandPlayerId = player.id;
  }
}

async function processStartTurn(player) {
  const resolving = player.statuses.filter((status) => ["pumpkin", "asparagus", "sweet_potato", "brussels_sprout"].includes(status.type));
  for (const status of resolving) {
    player.statuses.splice(player.statuses.indexOf(status), 1);
    await showEffectScene({ eyebrow: `${player.name} 예약 효과`, title: CARD_LIBRARY[status.cardId].name, message: COMPACT_RULES[status.cardId], cards: [status.cardId], variant: "reveal", duration: 800 });
    if (status.type === "pumpkin") {
      if (state.garden.length > 0) {
        const index = player.controller === "ai" ? chooseGardenCardForAi(player) : 0;
        const [harvested] = state.garden.splice(index, 1);
        player.hand.push(harvested);
        refillGarden();
        log(`호박 효과로 ${player.name}이(가) ${CARD_LIBRARY[harvested].name}을 추가 수확했습니다.`);
      }
      returnStatusCard(status);
    } else if (status.type === "asparagus") {
      const source = playerById(status.sourcePlayerId);
      if (source) source.discard.push(status.cardId);
      if (moveCard(player.hand, player.buried, "artichoke")) log(`아스파라거스 효과로 ${player.name}의 아티초크 1장이 묻혔습니다.`);
    } else if (status.type === "sweet_potato") {
      const revealed = [takeTopCard(player), takeTopCard(player), takeTopCard(player)].filter(Boolean);
      const vegetableIndex = chooseBestCardIndex(revealed);
      if (revealed.length > 0 && CARD_LIBRARY[revealed[vegetableIndex]].type === "vegetable") {
        player.hand.push(revealed.splice(vegetableIndex, 1)[0]);
      }
      player.discard.push(...revealed);
      returnStatusCard(status);
    } else if (status.type === "brussels_sprout") {
      if (player.hand.length > 0) player.discard.push(player.hand.splice(Math.floor(randomValue() * player.hand.length), 1)[0]);
      drawCards(player, 1);
      returnStatusCard(status);
      log(`방울양배추 효과로 ${player.name}의 손패 1장이 교체됐습니다.`);
    }
  }
  render();
}

async function consumeCucumberHarvest(player) {
  const statusIndex = player.statuses.findIndex((status) => status.type === "cucumber");
  if (statusIndex < 0 || state.garden.length === 0) return null;
  const [status] = player.statuses.splice(statusIndex, 1);
  const gardenIndex = Math.floor(randomValue() * state.garden.length);
  const cardId = state.garden[gardenIndex];
  await showEffectScene({
    eyebrow: `${player.name} 방해 효과`,
    title: "오이 · 무작위 수확",
    message: `${CARD_LIBRARY[cardId].name} 카드가 무작위로 선택됐습니다.`,
    cards: [{ id: "cucumber", label: "방해" }, { id: cardId, label: "수확" }],
    variant: "reveal-pair",
    duration: 1000
  });
  returnStatusCard(status);
  log(`오이 효과로 ${player.name}의 수확 카드가 ${CARD_LIBRARY[cardId].name}으로 무작위 결정됐습니다.`);
  return gardenIndex;
}

function clearEndOfTurnStatuses(player) {
  const expiring = player.statuses.filter((status) => status.type === "wasabi");
  expiring.forEach((status) => {
    player.statuses.splice(player.statuses.indexOf(status), 1);
    returnStatusCard(status);
  });
}

function showTurnHandoff() {
  if (!state.handoffPending || activePlayer()?.controller !== "local" || els.handoffDialog.open) return;
  els.handoffPlayerName.textContent = activePlayer().name;
  els.handoffMessage.textContent = "다른 플레이어는 화면을 보지 않도록 한 뒤 손패를 확인하세요.";
  els.handoffDialog.showModal();
}

function requestPrivateChoiceHandoff(player) {
  return new Promise((resolve) => {
    privateHandoffResolver = resolve;
    els.handoffPlayerName.textContent = player.name;
    els.handoffMessage.textContent = "카드 효과를 처리할 차례입니다. 화면을 넘겨받은 뒤 계속하세요.";
    els.handoffDialog.showModal();
  });
}

function artichokesInHand(player) {
  return player.hand.filter((id) => id === "artichoke").length;
}

function canPlay(player, cardId) {
  if (state.turnLocked || CARD_LIBRARY[cardId].type !== "vegetable") return false;
  if (player.statuses.some((status) => status.type === "wasabi") && state.cardsPlayedThisTurn >= 2) return false;
  switch (cardId) {
    case "eggplant":
      return artichokesInHand(player) >= 1 && player.hand.length >= 3 && state.players.every((candidate) => candidate.hand.length >= 2);
    case "potato":
      return availableDrawCount(player) > 0;
    case "carrot":
      return artichokesInHand(player) >= 2 && state.cardsPlayedThisTurn === 0;
    case "leek":
      return opponentsOf(player).some((target) => availableDrawCount(target) > 0);
    case "broccoli":
      return artichokesInHand(player) >= 3;
    case "beet":
      return player.hand.length >= 2 && opponentsOf(player).some((target) => target.hand.length > 0);
    case "peas":
      return state.gardenDeck.length >= 2;
    case "onion":
      return artichokesInHand(player) >= 1;
    case "corn":
      return artichokesInHand(player) >= 1 && state.garden.length > 0;
    case "pepper":
      return player.discard.length > 0;
    case "rhubarb":
      return state.garden.length > 0;
    case "tomato":
      return availableDrawCount(player) >= 3;
    case "bean_sprouts":
      return availableDrawCount(player) >= 2;
    case "cabbage":
      return artichokesInHand(player) >= 1;
    case "turnip":
      return artichokesInHand(player) >= 1 && player.discard.some((id) => CARD_LIBRARY[id].type === "vegetable");
    case "garlic":
      return player.hand.length >= 2 && opponentsOf(player).some((target) => target.hand.length > 0);
    case "mushroom":
      return player.discard.some((id) => MUSHROOM_COPY_IDS.includes(id) && canPlay(player, id));
    case "cauliflower":
      return artichokesInHand(player) >= 1 && state.cardsPlayedThisTurn >= 2;
    case "celery":
      return opponentsOf(player).some((target) => availableDrawCount(target) >= 2);
    case "pumpkin":
    case "asparagus":
    case "sweet_potato":
      return !player.statuses.some((status) => status.type === cardId);
    case "wasabi":
    case "cucumber":
    case "brussels_sprout":
      return opponentsOf(player).some((target) => !target.statuses.some((status) => status.type === cardId));
    case "parsley":
      return availableDrawCount(player) > 0;
    case "chicory":
      return true;
    default:
      return true;
  }
}

async function takeGardenCard(index) {
  const player = activePlayer();
  if (state.gameOver || state.actionPending || state.handoffPending || state.phase !== "harvest" || player.controller !== "local") return;
  state.actionPending = true;
  const cucumberIndex = await consumeCucumberHarvest(player);
  const hasCucumber = cucumberIndex !== null;
  const harvested = [];
  if (state.gameOptions.specialRuleId === "market_day" && !hasCucumber && state.garden.length >= 2) {
    await showSpecialRuleScene("market_day", "정원 카드 2장을 골라 모두 수확합니다.", 650);
    const indices = await chooseCards(state.garden, 2, "장날", "손으로 가져올 정원 카드 2장을 고르세요.");
    harvested.push(...removeCardsAt(state.garden, indices));
  } else {
    const resolvedIndex = hasCucumber ? cucumberIndex : index;
    harvested.push(state.garden.splice(resolvedIndex, 1)[0]);
  }
  if (state.gameOptions.specialRuleId === "impulse_buying" && state.garden.length > 0) {
    await showSpecialRuleScene("impulse_buying", "정원 카드 1장을 더 가져온 뒤 손패 1장을 버립니다.", 650);
    const extraIndex = (await chooseCards(state.garden, 1, "충동구매", "추가로 가져올 정원 카드 1장을 고르세요."))[0];
    harvested.push(state.garden.splice(extraIndex, 1)[0]);
  }
  player.hand.push(...harvested);
  refillGarden();
  if (state.gameOptions.specialRuleId === "impulse_buying") {
    const discardIndex = (await chooseCards(player.hand, 1, "충동구매", "손에서 버릴 카드 1장을 고르세요."))[0];
    player.discard.push(player.hand.splice(discardIndex, 1)[0]);
  }
  state.phase = "play";
  log(`수확: ${subject(player.name)} ${harvested.map((id) => CARD_LIBRARY[id].name).join(", ")}을(를) 가져왔습니다.`);
  pulseTable("harvest");
  state.actionPending = false;
  render();
  scrollToGameArea(els.handZone);
  maybeAutoEndTurn();
}

async function playHumanCard(handIndex) {
  const player = activePlayer();
  if (state.gameOver || state.actionPending || state.handoffPending || state.phase !== "play" || player.controller !== "local") return;
  window.clearTimeout(autoTurnTimer);
  const cardId = player.hand[handIndex];
  if (!canPlay(player, cardId)) return;
  state.actionPending = true;
  render();
  await playCard(player, cardId);
  state.actionPending = false;
  render();
  maybeAutoEndTurn();
}

async function playCard(player, cardId) {
  const card = CARD_LIBRARY[cardId];
  const buriedBefore = player.buried.length;
  const buriedArtichokesBefore = player.buried.filter((id) => id === "artichoke").length;
  removeFirst(player.hand, cardId);
  player.played.push(cardId);
  state.cardsPlayedThisTurn += 1;
  log(`사용: ${subject(player.name)} ${object(card.name)} 냈습니다.`);
  pulseTable("play");

  if (player.id !== state.visibleHandPlayerId) {
    await showEffectScene({
      eyebrow: `${player.name} 카드 사용`,
      title: card.name,
      message: COMPACT_RULES[cardId],
      cards: [{ id: cardId, label: `${player.name}이(가) 냈습니다` }],
      variant: "play-ai",
      duration: 1050
    });
  }

  switch (cardId) {
    case "eggplant":
      await resolveEggplant(player);
      break;
    case "potato":
      await resolvePotato(player);
      break;
    case "carrot":
      await resolveCarrot(player);
      break;
    case "leek":
      await resolveLeek(player);
      break;
    case "broccoli":
      moveCard(player.hand, player.buried, "artichoke");
      await showEffectScene({
        title: "아티초크 묻기",
        message: "브로콜리 효과로 아티초크 1장이 묻음 더미로 갑니다.",
        cards: ["artichoke"],
        variant: "bury",
        duration: 900
      });
      log(`${subject(player.name)} 아티초크 1장을 묻었습니다.`);
      break;
    case "beet":
      await resolveBeet(player);
      break;
    case "peas":
      await resolvePeas(player);
      break;
    case "onion":
      await resolveOnion(player);
      break;
    case "corn":
      await resolveCorn(player);
      break;
    case "pepper":
      await resolvePepper(player);
      break;
    case "rhubarb":
      await resolveRhubarb(player);
      break;
    default:
      if (CARD_LIBRARY[cardId].expansion) await resolveExpansionCard(player, cardId);
      break;
  }

  const buriedDifference = player.buried.length - buriedBefore;
  const buriedArtichokeDifference = player.buried.filter((id) => id === "artichoke").length - buriedArtichokesBefore;
  if (state.gameOptions.specialRuleId === "compost_bonus" && buriedDifference > 0 && !state.firstBuryBonusUsed) {
    state.firstBuryBonusUsed = true;
    await showSpecialRuleScene("compost_bonus", "이번 차례 처음 카드를 묻어 보너스 1장을 뽑습니다.", 650);
    const drawn = drawCards(player, 1);
    if (drawn.length > 0) {
      await showDrawScene(player, 1);
      log(`퇴비 보너스: ${player.name}이(가) 카드 1장을 뽑았습니다.`);
    }
  }
  if (state.gameOptions.specialRuleId === "pass_weeds" && buriedArtichokeDifference >= 2) {
    await showSpecialRuleScene("pass_weeds", "아티초크를 2장 이상 묻어 상대에게 잡초를 떠넘깁니다.", 650);
    const target = await chooseOpponent(player, opponentsOf(player), "아티초크를 받을 상대를 고르세요.");
    target.discard.push("artichoke");
    log(`잡초 떠넘기기: ${target.name}의 버림 더미에 아티초크 1장이 추가됐습니다.`);
  }
  if (state.gameOptions.specialRuleId === "mutual_aid" && state.cardsPlayedThisTurn === 1 && player.played.includes(cardId)) {
    await showSpecialRuleScene("mutual_aid", "첫 채소가 왼쪽 플레이어의 버림 더미로 이동합니다.", 650);
    moveCard(player.played, leftPlayerOf(player).discard, cardId);
    log(`품앗이: ${CARD_LIBRARY[cardId].name}이(가) ${leftPlayerOf(player).name}의 버림 더미로 갔습니다.`);
  }
  render();
}

async function resolveEggplant(player) {
  moveCard(player.hand, player.buried, "artichoke");
  moveCard(player.played, player.buried, "eggplant");
  const transfers = [];
  for (const participant of state.players) {
    const indices = await chooseHandCards(participant, 2, "왼쪽 플레이어에게 넘길 카드 2장을 고르세요.");
    transfers.push({ from: participant, cards: removeCardsAt(participant.hand, indices) });
  }
  await showEffectScene({
    title: "카드 2장씩 전달",
    message: "내 카드와 상대 카드가 서로 반대편 손패로 이동합니다.",
    cards: transfers.flatMap(({ from, cards }) => cards.map((id) => ({
      id,
      label: `${from.name} → ${leftPlayerOf(from).name}`,
      className: from.controller === "local" ? "from-local" : "from-ai"
    }))),
    variant: "transfer",
    duration: 1120
  });
  transfers.forEach(({ from, cards }) => {
    leftPlayerOf(from).hand.push(...cards);
  });
  log("가지 효과로 모든 플레이어가 왼쪽 플레이어에게 카드 2장을 넘겼습니다.");
}

async function resolvePotato(player) {
  const revealed = takeTopCard(player);
  if (!revealed) return;
  const destination = revealed === "artichoke" ? player.buried : player.discard;
  await showEffectScene({
    eyebrow: `${player.name} 카드 더미 공개`,
    title: CARD_LIBRARY[revealed].name,
    message: revealed === "artichoke" ? "아티초크이므로 묻음 더미로 이동합니다." : "채소이므로 버림 더미로 이동합니다.",
    cards: [{ id: revealed, label: "카드 더미 맨 위" }],
    variant: "reveal",
    duration: 1100
  });
  destination.push(revealed);
  log(`${subject(player.name)} ${object(CARD_LIBRARY[revealed].name)} 공개해 ${revealed === "artichoke" ? "묻었습니다" : "버렸습니다"}.`);
}

async function resolveCarrot(player) {
  moveCard(player.hand, player.buried, "artichoke");
  moveCard(player.hand, player.buried, "artichoke");
  moveCard(player.played, player.buried, "carrot");
  await showEffectScene({
    title: "세 카드 함께 묻기",
    message: "당근과 아티초크 2장이 게임에서 빠집니다.",
    cards: ["artichoke", "carrot", "artichoke"],
    variant: "bury",
    duration: 1050
  });
  state.turnLocked = true;
  log(`${player.name}의 아티초크 2장과 당근이 묻혔습니다. 이번 차례에는 다른 카드를 낼 수 없습니다.`);
}

async function resolveLeek(player) {
  const candidates = opponentsOf(player).filter((target) => availableDrawCount(target) > 0);
  const target = await chooseOpponent(player, candidates, "리크 효과를 적용할 상대를 고르세요.");
  if (parsleyBlocks(target, "leek")) {
    await showParsleyBlock(target, "leek");
    return;
  }
  const revealed = takeTopCard(target);
  if (!revealed) return;
  await showEffectScene({
    eyebrow: `${target.name} 카드 더미 공개`,
    title: CARD_LIBRARY[revealed].name,
    message: "공개한 카드를 어디로 보낼지 결정합니다.",
    cards: [{ id: revealed, label: `${target.name}의 맨 위 카드` }],
    variant: "reveal",
    duration: 1050
  });
  let destination = "take";
  if (player.controller === "local") {
    destination = await chooseOption({
      title: `${CARD_LIBRARY[revealed].name} 공개`,
      message: "이 카드를 내 손으로 가져올까요, 상대의 버린 카드 더미에 놓을까요?",
      options: [
        { value: "take", label: "내 손으로 가져오기" },
        { value: "discard", label: `${target.name}의 버림 더미에 놓기` }
      ]
    });
  } else if (revealed === "artichoke") {
    destination = "discard";
  }
  (destination === "take" ? player.hand : target.discard).push(revealed);
  await showEffectScene({
    title: destination === "take" ? "내 손으로 가져오기" : `${target.name}의 버림 더미로`,
    cards: [revealed],
    variant: destination === "take" ? "play-local" : "bury",
    duration: 720
  });
  log(`${subject(player.name)} ${target.name}의 ${object(CARD_LIBRARY[revealed].name)} ${destination === "take" ? "손으로 가져왔습니다" : "버림 더미에 놓았습니다"}.`);
}

async function resolveBeet(player) {
  const candidates = opponentsOf(player).filter((target) => target.hand.length > 0);
  const target = await chooseOpponent(player, candidates, "비트 효과를 적용할 상대를 고르세요.");
  const ownIndex = Math.floor(randomValue() * player.hand.length);
  const targetIndex = Math.floor(randomValue() * target.hand.length);
  const [ownCard] = player.hand.splice(ownIndex, 1);
  const [targetCard] = target.hand.splice(targetIndex, 1);
  log(`비트 공개: ${topic(player.name)} ${CARD_LIBRARY[ownCard].name}, ${topic(target.name)} ${CARD_LIBRARY[targetCard].name}.`);
  const bothArtichokes = ownCard === "artichoke" && targetCard === "artichoke";
  await showEffectScene({
    eyebrow: "비트 · 무작위 공개",
    title: bothArtichokes ? "둘 다 아티초크!" : "서로 다른 카드",
    message: bothArtichokes ? "두 카드를 함께 묻습니다." : "공개한 카드를 서로 맞바꿉니다.",
    cards: [
      { id: ownCard, label: player.name },
      { id: targetCard, label: target.name }
    ],
    variant: bothArtichokes ? "bury" : "swap-pair",
    duration: 1300
  });
  if (bothArtichokes) {
    player.buried.push(ownCard);
    target.buried.push(targetCard);
    log("두 카드가 모두 아티초크라서 함께 묻혔습니다.");
  } else {
    player.hand.push(targetCard);
    target.hand.push(ownCard);
    log("공개한 두 카드를 서로 맞바꿨습니다.");
  }
}

async function resolvePeas(player) {
  const revealed = [state.gardenDeck.pop(), state.gardenDeck.pop()];
  await showEffectScene({
    eyebrow: "완두콩 · 정원 덱 공개",
    title: "카드 2장 공개",
    message: "한 장은 내 버림 더미, 다른 한 장은 상대 버림 더미로 보냅니다.",
    cards: revealed,
    variant: "reveal-pair",
    duration: 1050
  });
  const ownIndex = player.controller === "local"
    ? (await chooseCards(revealed, 1, "완두콩", "내 버린 카드 더미에 놓을 카드 1장을 고르세요."))[0]
    : (aiCardPriority(revealed[0]) >= aiCardPriority(revealed[1]) ? 0 : 1);
  const [ownCard] = revealed.splice(ownIndex, 1);
  const target = await chooseOpponent(player, opponentsOf(player), "나머지 카드를 받을 상대를 고르세요.");
  player.discard.push(ownCard);
  target.discard.push(revealed[0]);
  await showEffectScene({
    title: "버림 더미로 분배",
    cards: [
      { id: ownCard, label: `${player.name} 버림` },
      { id: revealed[0], label: `${target.name} 버림` }
    ],
    variant: "bury",
    duration: 850
  });
  log(`완두콩 효과로 ${topic(CARD_LIBRARY[ownCard].name)} ${player.name}, ${topic(CARD_LIBRARY[revealed[0]].name)} ${target.name}의 버림 더미로 갔습니다.`);
}

async function resolveOnion(player) {
  const target = await chooseOpponent(player, opponentsOf(player), "양파를 보낼 상대를 고르세요.");
  moveCard(player.hand, player.buried, "artichoke");
  moveCard(player.played, target.discard, "onion");
  await showEffectScene({
    title: "묻고 건네기",
    message: `아티초크는 묻고, 양파는 ${target.name}의 버림 더미로 보냅니다.`,
    cards: [
      { id: "artichoke", label: "묻음" },
      { id: "onion", label: `${target.name} 버림` }
    ],
    variant: "bury",
    duration: 900
  });
  log(`${subject(player.name)} 아티초크 1장을 묻고 양파를 ${target.name}의 버림 더미로 보냈습니다.`);
}

async function resolveCorn(player) {
  moveCard(player.hand, player.buried, "artichoke");
  moveCard(player.played, player.buried, "corn");
  const index = player.controller === "local"
    ? (await chooseCards(state.garden, 1, "옥수수", "내 카드 더미 맨 위에 놓을 정원 카드 1장을 고르세요."))[0]
    : chooseGardenCardForAi(player);
  const [chosen] = state.garden.splice(index, 1);
  player.deck.push(chosen);
  refillGarden();
  await showEffectScene({
    title: "카드 더미 맨 위로",
    message: `${CARD_LIBRARY[chosen].name}이(가) 다음에 뽑힐 카드가 됩니다.`,
    cards: [chosen],
    variant: "move-deck",
    duration: 900
  });
  log(`${subject(player.name)} ${object(CARD_LIBRARY[chosen].name)} 카드 더미 맨 위에 놓았습니다.`);
}

async function resolvePepper(player) {
  const index = player.controller === "local"
    ? (await chooseCards(player.discard, 1, "피망", "카드 더미 맨 위에 올릴 버린 카드 1장을 고르세요."))[0]
    : chooseBestCardIndex(player.discard);
  const [chosen] = player.discard.splice(index, 1);
  player.deck.push(chosen);
  await showEffectScene({
    title: "버림 더미에서 되찾기",
    message: `${CARD_LIBRARY[chosen].name}을(를) 카드 더미 맨 위에 올립니다.`,
    cards: [chosen],
    variant: "move-deck",
    duration: 900
  });
  log(`${subject(player.name)} ${object(CARD_LIBRARY[chosen].name)} 카드 더미 맨 위에 올렸습니다.`);
}

async function resolveRhubarb(player) {
  moveCard(player.played, player.buried, "rhubarb");
  state.gardenDeck.unshift(...state.garden.splice(0));
  refillGarden();
  await showEffectScene({
    eyebrow: "루바브 · 정원 교체",
    title: "새로운 정원",
    message: "정원 카드가 모두 교체됐습니다.",
    cards: state.garden,
    variant: "fan",
    duration: 1050
  });
  const index = player.controller === "local"
    ? (await chooseCards(state.garden, 1, "새 정원", "루바브 효과로 수확할 카드 1장을 고르세요."))[0]
    : chooseGardenCardForAi(player);
  const [harvested] = state.garden.splice(index, 1);
  player.hand.push(harvested);
  refillGarden();
  await showEffectScene({
    title: `${CARD_LIBRARY[harvested].name} 수확`,
    cards: [harvested],
    variant: player.controller === "local" ? "play-local" : "play-ai",
    duration: 680
  });
  log(`${subject(player.name)} 정원을 교체하고 ${object(CARD_LIBRARY[harvested].name)} 수확했습니다.`);
}

async function chooseHandIndex(player, title, message) {
  if (player.controller === "local") {
    if (player.id !== state.visibleHandPlayerId) await requestPrivateChoiceHandoff(player);
    return (await chooseCards(player.hand, 1, title, message))[0];
  }
  return [...player.hand.keys()].sort((a, b) => passCardScore(player.hand[b]) - passCardScore(player.hand[a]))[0];
}

function plantStatus(owner, target, cardId, type) {
  removeFirst(owner.played, cardId);
  target.statuses.push({ type, cardId, sourcePlayerId: owner.id });
}

function plantSharedStatus(owner, targets, cardId, type) {
  removeFirst(owner.played, cardId);
  const statusGroupId = `${owner.id}-${cardId}-${state.turn}-${state.statusSequence += 1}`;
  targets.forEach((target) => {
    target.statuses.push({ type, cardId, sourcePlayerId: owner.id, statusGroupId });
  });
}

function returnStatusCard(status, destination = "discard") {
  if (status.statusGroupId && state.players.some((player) =>
    player.statuses.some((candidate) => candidate.statusGroupId === status.statusGroupId))) return;
  const source = playerById(status.sourcePlayerId);
  if (source) source[destination].push(status.cardId);
}

function parsleyBlocks(target, cardId) {
  return PARSLEY_BLOCKED_EFFECT_IDS.has(cardId) && target.hand.includes("parsley");
}

async function showParsleyBlock(target, cardId) {
  await showEffectScene({
    eyebrow: `${target.name} 방어`,
    title: "파슬리 · 직접 방해 무효",
    message: `${CARD_LIBRARY[cardId].name} 효과가 ${target.name}에게 적용되지 않습니다.`,
    cards: [{ id: cardId, label: "무효" }, { id: "parsley", label: `${target.name} 손패` }],
    variant: "reveal-pair",
    duration: 1000
  });
  log(`${target.name}의 파슬리가 ${CARD_LIBRARY[cardId].name}의 직접 방해를 막았습니다.`);
}

async function resolveExpansionCard(player, cardId) {
  if (cardId === "tomato") {
    const revealed = [takeTopCard(player), takeTopCard(player), takeTopCard(player)].filter(Boolean);
    await showEffectScene({ title: "토마토 선별", message: "한 장은 덱 위로, 나머지는 버립니다.", cards: revealed, variant: "reveal-pair", duration: 950 });
    const index = player.controller === "local" ? (await chooseCards(revealed, 1, "토마토", "덱 맨 위에 되돌릴 카드 1장을 고르세요."))[0] : chooseBestCardIndex(revealed);
    const [chosen] = revealed.splice(index, 1);
    player.discard.push(...revealed);
    player.deck.push(chosen);
    return;
  }

  if (cardId === "cabbage") {
    const count = Math.min(2, artichokesInHand(player));
    for (let i = 0; i < count; i += 1) {
      removeFirst(player.hand, "artichoke");
      player.deck.unshift("artichoke");
    }
    const drawn = drawCards(player, count);
    await showDrawScene(player, drawn.length);
    log(`${player.name}이(가) 아티초크 ${count}장을 덱 아래로 보내고 새 카드를 뽑았습니다.`);
    return;
  }

  if (cardId === "turnip") {
    moveCard(player.hand, player.discard, "artichoke");
    const candidates = player.discard.map((id, index) => ({ id, index })).filter(({ id }) => CARD_LIBRARY[id].type === "vegetable");
    const selected = player.controller === "local"
      ? (await chooseCards(candidates.map(({ id }) => id), 1, "순무", "손으로 가져올 버린 채소를 고르세요."))[0]
      : chooseBestCardIndex(candidates.map(({ id }) => id));
    const [chosen] = player.discard.splice(candidates[selected].index, 1);
    player.hand.push(chosen);
    return;
  }

  if (cardId === "garlic") {
    const target = await chooseOpponent(player, opponentsOf(player).filter((candidate) => candidate.hand.length > 0), "마늘 효과를 적용할 상대를 고르세요.");
    const ownIndex = Math.floor(randomValue() * player.hand.length);
    const targetIndex = Math.floor(randomValue() * target.hand.length);
    const [ownCard] = player.hand.splice(ownIndex, 1);
    const [targetCard] = target.hand.splice(targetIndex, 1);
    const bothNonArtichokes = ownCard !== "artichoke" && targetCard !== "artichoke";
    await showEffectScene({ title: bothNonArtichokes ? "둘 다 아티초크가 아님" : "서로 교환", cards: [{ id: ownCard, label: player.name }, { id: targetCard, label: target.name }], variant: bothNonArtichokes ? "bury" : "swap-pair", duration: 1100 });
    if (bothNonArtichokes) {
      player.discard.push(ownCard);
      target.discard.push(targetCard);
    } else {
      player.hand.push(targetCard);
      target.hand.push(ownCard);
    }
    return;
  }

  if (cardId === "mushroom") {
    const candidates = player.discard.filter((id) => MUSHROOM_COPY_IDS.includes(id) && canPlay(player, id));
    const selected = player.controller === "local"
      ? (await chooseCards(candidates, 1, "버섯", "효과를 복사할 버린 채소를 고르세요."))[0]
      : chooseBestCardIndex(candidates);
    const chosen = candidates[selected];
    moveCard(player.played, player.buried, "mushroom");
    await showEffectScene({ title: `${CARD_LIBRARY[chosen].name} 효과 복사`, cards: [chosen], variant: "reveal", duration: 750 });
    await resolveCopiedEffect(player, chosen);
    return;
  }

  if (cardId === "cauliflower") {
    moveCard(player.hand, player.buried, "artichoke");
    await showEffectScene({
      title: "연속 사용 보상",
      message: "아티초크 1장을 묻고, 콜리플라워는 차례 종료 시 버립니다.",
      cards: ["artichoke"],
      variant: "bury",
      duration: 850
    });
    return;
  }

  if (["pumpkin", "asparagus", "sweet_potato"].includes(cardId)) {
    plantStatus(player, player, cardId, cardId);
    log(`${CARD_LIBRARY[cardId].name} 효과가 ${player.name}의 다음 차례에 예약됐습니다.`);
    return;
  }

  if (cardId === "bean_sprouts") {
    const revealed = [takeTopCard(player), takeTopCard(player)].filter(Boolean);
    await showEffectScene({ title: "콩나물 공개", cards: revealed, variant: "reveal-pair", duration: 900 });
    const artichokeIndex = revealed.indexOf("artichoke");
    const chosenIndex = artichokeIndex >= 0
      ? artichokeIndex
      : player.controller === "local"
        ? (await chooseCards(revealed, 1, "콩나물", "손으로 가져올 카드 1장을 고르세요."))[0]
        : chooseBestCardIndex(revealed);
    player.hand.push(revealed[chosenIndex]);
    revealed.splice(chosenIndex, 1);
    player.discard.push(...revealed);
    return;
  }

  if (["wasabi", "cucumber", "brussels_sprout"].includes(cardId)) {
    const candidates = opponentsOf(player).filter((target) => !target.statuses.some((status) => status.type === cardId));
    const protectedTargets = candidates.filter((target) => parsleyBlocks(target, cardId));
    const affectedTargets = candidates.filter((target) => !parsleyBlocks(target, cardId));
    for (const target of protectedTargets) {
      await showParsleyBlock(target, cardId);
    }
    if (affectedTargets.length > 0) {
      plantSharedStatus(player, affectedTargets, cardId, cardId);
      log(`${affectedTargets.map((target) => target.name).join(", ")}에게 ${CARD_LIBRARY[cardId].name} 예약 효과가 걸렸습니다.`);
    } else {
      moveCard(player.played, player.discard, cardId);
    }
    return;
  }

  if (cardId === "celery") {
    const candidates = opponentsOf(player).filter((target) => availableDrawCount(target) >= 2);
    const target = await chooseOpponent(player, candidates, "덱 위를 바꿀 상대를 고르세요.");
    if (parsleyBlocks(target, "celery")) {
      await showParsleyBlock(target, "celery");
      return;
    }
    const revealed = [takeTopCard(target), takeTopCard(target)].filter(Boolean);
    await showEffectScene({ title: `${target.name} 덱 위`, cards: revealed, variant: "reveal-pair", duration: 850 });
    const topIndex = player.controller === "local" ? (await chooseCards(revealed, 1, "셀러리", "맨 위에 놓을 카드를 고르세요."))[0] : revealed.findIndex((id) => id === "artichoke");
    const resolvedIndex = topIndex < 0 ? 0 : topIndex;
    const [topCard] = revealed.splice(resolvedIndex, 1);
    target.deck.push(...revealed, topCard);
    return;
  }

  if (cardId === "parsley") {
    const revealed = takeTopCard(player);
    if (!revealed) return;
    await showEffectScene({
      title: "덱 위 확인",
      message: "이 카드를 덱 위에 그대로 두거나 버릴 수 있습니다.",
      cards: [revealed],
      variant: "reveal",
      duration: 800
    });
    const destination = player.controller === "local"
      ? await chooseOption({
        title: `${CARD_LIBRARY[revealed].name} 확인`,
        message: "이 카드를 어떻게 처리할까요?",
        options: [
          { value: "keep", label: "덱 위에 두기" },
          { value: "discard", label: "버리기" }
        ]
      })
      : revealed === "artichoke" ? "discard" : "keep";
    if (destination === "discard") player.discard.push(revealed);
    else player.deck.push(revealed);
    log(`파슬리 효과로 ${player.name}이(가) ${CARD_LIBRARY[revealed].name}을(를) ${destination === "discard" ? "버렸습니다" : "덱 위에 두었습니다"}.`);
    return;
  }

  if (cardId === "chicory") {
    const returned = [];
    const blocked = [];
    state.players.forEach((target) => {
      if (artichokesInHand(target) > 2) return;
      const buriedIndex = target.buried.lastIndexOf("artichoke");
      if (buriedIndex < 0) return;
      if (target.id !== player.id && parsleyBlocks(target, "chicory")) {
        blocked.push(target);
        return;
      }
      target.buried.splice(buriedIndex, 1);
      target.hand.push("artichoke");
      returned.push({ id: "artichoke", label: target.name });
    });
    for (const target of blocked) {
      await showParsleyBlock(target, "chicory");
    }
    await showEffectScene({
      title: "묻은 아티초크의 귀환",
      message: returned.length > 0
        ? "조건을 만족한 플레이어마다 아티초크 1장이 돌아갑니다."
        : "조건을 만족한 플레이어가 없어 돌아온 아티초크가 없습니다.",
      cards: returned,
      variant: "transfer",
      duration: 1100
    });
  }
}

async function resolveCopiedEffect(player, cardId) {
  if (cardId === "potato") return resolvePotato(player);
  if (cardId === "leek") return resolveLeek(player);
  if (cardId === "broccoli") {
    moveCard(player.hand, player.buried, "artichoke");
    return showEffectScene({ title: "브로콜리 효과 복사", cards: ["artichoke"], variant: "bury", duration: 700 });
  }
  if (cardId === "beet") return resolveBeet(player);
  if (cardId === "peas") return resolvePeas(player);
  return resolveExpansionCard(player, cardId);
}

async function chooseHandCards(player, count, message) {
  if (player.controller === "local") {
    if (player.id !== state.visibleHandPlayerId) await requestPrivateChoiceHandoff(player);
    const onlyArtichokes = player.hand.every((cardId) => cardId === "artichoke");
    return chooseCards(
      player.hand,
      count,
      "가지",
      onlyArtichokes ? "선택지가 모두 같아 아티초크 2장을 자동으로 선택합니다." : message,
      onlyArtichokes ? { autoSelect: [0, 1], autoConfirmAfter: 820 } : {}
    );
  }
  return [...player.hand.keys()]
    .sort((a, b) => passCardScore(player.hand[b]) - passCardScore(player.hand[a]))
    .slice(0, count);
}

function passCardScore(cardId) {
  return cardId === "artichoke" ? 100 : 20 - aiCardPriority(cardId);
}

function chooseBestCardIndex(cards) {
  let bestIndex = 0;
  cards.forEach((cardId, index) => {
    if (aiCardPriority(cardId) > aiCardPriority(cards[bestIndex])) bestIndex = index;
  });
  return bestIndex;
}

async function chooseOpponent(player, candidates, message) {
  if (candidates.length === 1) return candidates[0];
  if (player.controller === "ai") {
    return [...candidates].sort((a, b) => countArtichokes(b) - countArtichokes(a))[0];
  }
  const chosenId = await chooseOption({
    title: "상대 선택",
    message,
    options: candidates.map((candidate) => ({
      value: candidate.id,
      label: candidate.name,
      description: `손패 ${candidate.hand.length} · 덱 ${candidate.deck.length} · 버림 ${candidate.discard.length} · 묻음 ${candidate.buried.length} · 아티초크 ${countArtichokes(candidate)} · 예약 ${candidate.statuses.length}`
    }))
  });
  return playerById(chosenId);
}

function chooseCards(cards, count, title, message, behavior = {}) {
  return new Promise((resolve) => {
    const selected = new Set();
    let settled = false;
    els.choiceTitle.textContent = title;
    els.choiceMessage.textContent = message;
    els.choiceOptions.className = "choice-options card-choices";
    els.choiceOptions.innerHTML = "";
    els.choiceConfirm.disabled = true;
    els.choiceConfirm.hidden = false;

    cards.forEach((cardId, index) => {
      const card = createCard(cardId, { disabled: false });
      card.addEventListener("click", () => {
        if (selected.has(index)) selected.delete(index);
        else if (selected.size < count) selected.add(index);
        card.classList.toggle("selected", selected.has(index));
        els.choiceConfirm.disabled = selected.size !== count;
      });
      els.choiceOptions.append(card);
    });

    const completeSelection = () => {
      if (settled) return;
      if (selected.size !== count) return;
      settled = true;
      els.choiceDialog.close();
      resolve([...selected]);
    };
    els.choiceConfirm.onclick = completeSelection;
    els.choiceDialog.showModal();

    if (behavior.autoSelect) {
      behavior.autoSelect.forEach((index) => {
        selected.add(index);
        els.choiceOptions.children[index]?.classList.add("selected");
      });
      els.choiceConfirm.disabled = selected.size !== count;
      window.setTimeout(completeSelection, motionTime(behavior.autoConfirmAfter ?? 800));
    }
  });
}

function chooseOption({ title, message, options }) {
  return new Promise((resolve) => {
    els.choiceTitle.textContent = title;
    els.choiceMessage.textContent = message;
    els.choiceOptions.className = "choice-options option-choices";
    els.choiceOptions.innerHTML = "";
    els.choiceConfirm.hidden = true;
    options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "button choice-button";
      if (option.description) {
        button.classList.add("has-description");
        const label = document.createElement("strong");
        label.textContent = option.label;
        const description = document.createElement("small");
        description.textContent = option.description;
        button.append(label, description);
      } else {
        button.textContent = option.label;
      }
      button.addEventListener("click", () => {
        els.choiceDialog.close();
        resolve(option.value);
      });
      els.choiceOptions.append(button);
    });
    els.choiceDialog.showModal();
  });
}

function maybeAutoEndTurn() {
  window.clearTimeout(autoTurnTimer);
  const player = activePlayer();
  if (state.gameOver || state.actionPending || state.handoffPending || state.phase !== "play" || player.controller !== "local") return;
  if (player.hand.some((cardId) => canPlay(player, cardId))) return;
  showToast("낼 수 있는 카드가 없어 잠시 후 턴을 넘깁니다.");
  autoTurnTimer = window.setTimeout(() => {
    if (!state.actionPending && state.phase === "play" && activePlayer().id === player.id) endHumanTurn();
  }, motionTime(900));
}

async function endHumanTurn() {
  const player = activePlayer();
  if (state.gameOver || state.actionPending || state.handoffPending || state.phase !== "play" || player.controller !== "local") return;
  window.clearTimeout(autoTurnTimer);
  state.actionPending = true;
  render();
  await finishTurn(player);
  if (!state.gameOver) {
    await advanceToNextPlayer(player);
    if (state.gameOver) {
      state.actionPending = false;
      return;
    }
    await processStartTurn(activePlayer());
    state.actionPending = false;
    render();
    scrollToGameArea(els.table);
    showTurnHandoff();
    scheduleAutomatedTurn();
  } else {
    state.actionPending = false;
  }
}

async function advanceToNextPlayer(player) {
  const next = leftPlayerOf(player);
  if (next.seat === 0) {
    const rule = SPECIAL_RULES[state.gameOptions.specialRuleId];
    if (rule?.scoreRace && state.turn >= rule.rounds) {
      finishScoreRace(rule);
      return;
    }
    await applyRoundEndRule();
    state.turn += 1;
    log(`${state.turn}턴이 시작됐습니다.`);
  }
  state.currentPlayerId = next.id;
  state.phase = "harvest";
  resetTurnState();
  prepareTurnVisibility(next);
}

async function applyRoundEndRule() {
  const ruleId = state.gameOptions.specialRuleId;
  if (ruleId === "crop_rotation") {
    state.gardenDeck.unshift(...state.garden.splice(0));
    refillGarden();
    log("돌려짓기: 정원 줄이 모두 교체됐습니다.");
    await showSpecialRuleScene(ruleId, "정원 줄의 카드가 모두 교체됩니다.");
  } else if (ruleId === "spreading_weeds") {
    state.players.forEach((player) => player.discard.push("artichoke"));
    log("번지는 잡초: 모든 플레이어의 버림 더미에 아티초크 1장이 추가됐습니다.");
    await showSpecialRuleScene(ruleId, "모든 플레이어의 버림 더미에 아티초크 1장이 추가됩니다.");
  } else if (ruleId === "endless_weeds") {
    const buriedCounts = state.players.map((player) => player.buried.filter((id) => id === "artichoke").length);
    const minimum = Math.min(...buriedCounts);
    const candidates = state.players.filter((_, index) => buriedCounts[index] === minimum);
    const target = candidates[Math.floor(randomValue() * candidates.length)];
    target.discard.push("artichoke");
    log(`끝없는 잡초: ${target.name}의 버림 더미에 아티초크 1장이 추가됐습니다.`);
    await showSpecialRuleScene(ruleId, `${target.name}의 버림 더미에 아티초크 1장이 추가됩니다.`);
  }
}

function finishScoreRace(rule) {
  const ranking = [...state.players].sort((a, b) => {
    const artichokeDifference = countArtichokes(a) - countArtichokes(b);
    if (artichokeDifference !== 0) return artichokeDifference;
    const aBuried = a.buried.filter((id) => id === "artichoke").length;
    const bBuried = b.buried.filter((id) => id === "artichoke").length;
    return bBuried - aBuried;
  });
  const winner = ranking[0];
  state.gameOver = true;
  state.winnerId = winner.id;
  stopBackgroundMusic();
  playSound("win");
  log(`${rule.name} 종료: ${winner.name}이(가) 남은 아티초크 ${countArtichokes(winner)}장으로 승리했습니다.`);
  window.setTimeout(async () => {
    await showSpecialRuleScene(state.gameOptions.specialRuleId, `${rule.rounds}라운드가 끝나 최종 아티초크 수를 비교합니다.`, 900);
    render();
    showResultScreen(winner);
  }, motionTime(500));
}

function scheduleAutomatedTurn() {
  if (!state.gameOver && activePlayer().controller === "ai") {
    window.setTimeout(runAiTurn, 650);
  }
}

async function finishTurn(player) {
  const remaining = player.hand.splice(0);
  const discardedCount = remaining.length + player.played.length;
  player.discard.push(...remaining, ...player.played.splice(0));
  log(`버리기: ${subject(player.name)} 카드 ${discardedCount}장을 버림 더미로 옮겼습니다.`);
  const handSize = state.gameOptions.specialRuleId === "big_basket" ? 6 : 5;
  if (state.gameOptions.specialRuleId === "big_basket") {
    await showSpecialRuleScene("big_basket", "이번 차례에는 손패를 6장으로 채웁니다.", 650);
  }
  const drawn = drawCards(player, handSize);
  render();
  await showDrawScene(player, drawn.length);
  log(`뽑기: ${subject(player.name)} 카드 ${handSize}장으로 손을 채웠습니다.`);
  clearEndOfTurnStatuses(player);
  const scoreRace = SPECIAL_RULES[state.gameOptions.specialRuleId]?.scoreRace;
  if (!scoreRace && !player.hand.includes("artichoke")) {
    state.gameOver = true;
    state.winnerId = player.id;
    log(`${player.name} 승리! 뽑은 5장에 아티초크가 없습니다.`);
    stopBackgroundMusic();
    playSound("win");
    render();
    document.querySelector(`[data-player-id="${player.id}"]`)?.classList.add("winner");
    await waitForMotion(520);
    showResultScreen(player);
  }
}

function showResultScreen(winner) {
  const ranking = [...state.players].sort((a, b) => {
    if (a.id === winner.id) return -1;
    if (b.id === winner.id) return 1;
    return countArtichokes(a) - countArtichokes(b) || b.buried.length - a.buried.length;
  });
  els.resultWinnerName.textContent = `${winner.name} 승리!`;
  const scoreRace = SPECIAL_RULES[state.gameOptions.specialRuleId]?.scoreRace;
  els.resultSummary.textContent = scoreRace
    ? `${state.turn}라운드 종료 · 남은 아티초크 ${countArtichokes(winner)}장으로 우승했습니다.`
    : `${state.turn}턴 만에 아티초크 없는 손패를 완성했습니다.`;
  els.resultList.innerHTML = "";
  ranking.forEach((player, index) => {
    const row = document.createElement("div");
    row.className = "result-row";
    row.innerHTML = `
      <span class="result-rank">${index + 1}</span>
      <span class="result-player"><strong>${escapeHtml(player.name)}</strong><small>${player.controller === "ai" ? "AI" : "로컬"}</small></span>
      <span class="result-stat"><strong>${countArtichokes(player)}</strong><small>아티초크</small></span>
      <span class="result-stat"><strong>${player.buried.length}</strong><small>묻은 카드</small></span>
    `;
    els.resultList.append(row);
  });
  els.resultDialog.showModal();
}

async function runAiTurn() {
  if (state.gameOver) return;
  const ai = activePlayer();
  if (ai.controller !== "ai") return;
  state.actionPending = true;
  const harvested = await harvestForAi(ai);
  state.phase = "play";
  log(`수확: ${subject(ai.name)} ${harvested.map((id) => CARD_LIBRARY[id].name).join(", ")}을(를) 가져왔습니다.`);
  pulseTable("harvest");
  render();

  let safety = 0;
  while (safety < 14 && !state.turnLocked) {
    const playable = ai.hand
      .filter((id) => canPlay(ai, id))
      .sort((a, b) => aiCardPriority(b) - aiCardPriority(a));
    if (playable.length === 0) break;
    await playCard(ai, playable[0]);
    safety += 1;
  }

  await finishTurn(ai);
  state.actionPending = false;
  if (!state.gameOver) {
    await advanceToNextPlayer(ai);
    if (!state.gameOver) await processStartTurn(activePlayer());
  }
  render();
  if (!state.gameOver && activePlayer().controller === "local") scrollToGameArea(els.table);
  showTurnHandoff();
  flashTurnArrival();
  scheduleAutomatedTurn();
}

async function harvestForAi(player) {
  const harvested = [];
  const cucumberIndex = await consumeCucumberHarvest(player);
  const randomHarvest = cucumberIndex !== null;
  if (state.gameOptions.specialRuleId === "market_day" && !randomHarvest && state.garden.length >= 2) {
    await showSpecialRuleScene("market_day", `${player.name}이(가) 정원 카드 2장을 수확합니다.`, 650);
    const ranked = state.garden.map((id, index) => ({ id, index, score: aiCardPriority(id) })).sort((a, b) => b.score - a.score).slice(0, 2);
    const indices = ranked.map(({ index }) => index);
    harvested.push(...removeCardsAt(state.garden, indices));
  } else {
    const index = randomHarvest ? cucumberIndex : chooseGardenCardForAi(player);
    harvested.push(state.garden.splice(index, 1)[0]);
  }
  if (state.gameOptions.specialRuleId === "impulse_buying" && state.garden.length > 0) {
    await showSpecialRuleScene("impulse_buying", `${player.name}이(가) 카드 1장을 더 가져오고 손패 1장을 버립니다.`, 650);
    harvested.push(state.garden.splice(chooseGardenCardForAi(player), 1)[0]);
  }
  player.hand.push(...harvested);
  refillGarden();
  if (state.gameOptions.specialRuleId === "impulse_buying") {
    const discardIndex = [...player.hand.keys()].sort((a, b) => passCardScore(player.hand[b]) - passCardScore(player.hand[a]))[0];
    player.discard.push(player.hand.splice(discardIndex, 1)[0]);
  }
  return harvested;
}

function chooseGardenCardForAi(player) {
  let bestIndex = 0;
  let bestScore = -Infinity;
  state.garden.forEach((id, index) => {
    const score = aiCardPriority(id) + randomValue() * 0.3 + (artichokesInHand(player) >= 3 && id === "broccoli" ? 2 : 0);
    if (score > bestScore) {
      bestIndex = index;
      bestScore = score;
    }
  });
  return bestIndex;
}

function aiCardPriority(cardId) {
  return {
    carrot: 11,
    eggplant: 10,
    broccoli: 9,
    onion: 8,
    corn: 8,
    rhubarb: 7,
    potato: 6,
    leek: 6,
    beet: 5,
    peas: 4,
    pepper: 3,
    cauliflower: 12,
    asparagus: 10,
    cabbage: 9,
    turnip: 9,
    chicory: 8,
    wasabi: 8,
    brussels_sprout: 7,
    cucumber: 7,
    tomato: 7,
    bean_sprouts: 7,
    mushroom: 6,
    sweet_potato: 6,
    pumpkin: 6,
    garlic: 5,
    celery: 5,
    parsley: 4,
    artichoke: 0
  }[cardId] ?? 1;
}

function collectChangedPlayerIds() {
  const changed = new Set();
  state.players.forEach((player) => {
    const signature = [
      player.deck.length,
      player.hand.length,
      player.discard.length,
      player.buried.length,
      player.played.length,
      player.statuses.map((status) => status.type).sort().join(",")
    ].join("|");
    const previous = lastPlayerVisualState.get(player.id);
    if (previous && previous !== signature) changed.add(player.id);
    lastPlayerVisualState.set(player.id, signature);
  });
  return changed;
}

function render() {
  els.gardenDeckCount.textContent = state.gardenDeck.length;

  const player = activePlayer();
  const visiblePlayer = playerById(state.visibleHandPlayerId);
  const changedPlayerIds = collectChangedPlayerIds();
  els.turnBadge.textContent = state.gameOver ? "게임 종료" : `${player.name} 턴`;
  els.phaseText.textContent = getPhaseText();
  els.statusText.textContent = state.gameOver
    ? "새 게임을 누르면 다시 시작할 수 있습니다."
    : `${state.turn}턴 진행 중 · 정원 덱 ${state.gardenDeck.length}장${state.gameOptions.specialRuleId ? ` · ${SPECIAL_RULES[state.gameOptions.specialRuleId].name}${SPECIAL_RULES[state.gameOptions.specialRuleId].rounds ? ` ${state.turn}/${SPECIAL_RULES[state.gameOptions.specialRuleId].rounds}` : ""}` : ""}`;
  const hasVariantRule = Boolean(state.gameOptions.specialRuleId);
  els.wildRuleBanner.hidden = !hasVariantRule;
  if (hasVariantRule) {
    const gardenNote = state.gameOptions.mode === "wild-garden"
      ? `27종 중 11종 무작위 · 신규 ${state.expansionCardIds.length}종`
      : state.gameOptions.mode === "custom"
        ? `커스텀 채소 11종 · 신규 ${state.expansionCardIds.length}종`
        : "기본 채소 11종";
    els.wildRuleBanner.innerHTML = `<strong>${SPECIAL_RULES[state.gameOptions.specialRuleId].name}</strong><span>${SPECIAL_RULES[state.gameOptions.specialRuleId].text} · ${gardenNote}</span>`;
  }
  els.endTurn.disabled = state.gameOver || state.actionPending || state.handoffPending || state.phase !== "play" || player.controller !== "local";
  const cucumberHarvest = state.phase === "harvest" && player.statuses.some((status) => status.type === "cucumber");
  els.gardenHint.textContent = cucumberHarvest
    ? "오이 효과 · 무작위 수확"
    : state.phase === "harvest" && player.controller === "local" && !state.handoffPending ? "카드 1장을 선택" : "정원 줄";
  els.handHint.textContent = state.handoffPending ? "손패 인계 대기 중" : state.phase === "play" ? "밝게 표시된 카드만 사용 가능" : "수확 후 사용 가능";
  els.handOwnerName.textContent = visiblePlayer ? `${visiblePlayer.name} 손패` : "가려진 손패";
  els.activeDeckStack.textContent = visiblePlayer?.deck.length ?? "-";
  els.activeDiscardStack.textContent = visiblePlayer?.discard.length ?? "-";
  els.activeBuriedStack.textContent = visiblePlayer?.buried.length ?? "-";

  renderPlayerPanels(changedPlayerIds);
  renderPhaseTrack();
  renderOpponentSeats(visiblePlayer, changedPlayerIds);
  renderGarden();
  renderHand(visiblePlayer);
}

function renderPlayerPanels(changedPlayerIds = new Set()) {
  els.playerPanels.innerHTML = "";
  state.players.forEach((player) => {
    const panel = document.createElement("article");
    panel.className = "player-panel";
    panel.dataset.playerId = player.id;
    panel.classList.toggle("active", player.id === state.currentPlayerId && !state.gameOver);
    panel.classList.toggle("state-updated", changedPlayerIds.has(player.id));
    panel.innerHTML = `
      <div>
        <div class="player-name-row">
          <span class="panel-label">${escapeHtml(player.name)}</span>
          <span class="controller-badge">${player.controller === "ai" ? "AI" : "로컬"}</span>
        </div>
        <strong>${countArtichokes(player)}</strong>
        <span>아티초크</span>
      </div>
      <dl>
        <div><dt>덱</dt><dd>${player.deck.length}</dd></div>
        <div><dt>패</dt><dd>${player.hand.length}</dd></div>
        <div><dt>버림</dt><dd>${player.discard.length}</dd></div>
        <div><dt>묻음</dt><dd>${player.buried.length}</dd></div>
      </dl>
      ${player.statuses.length > 0 ? `<div class="status-badges">${player.statuses.map((status) => `<span class="status-badge">${escapeHtml(CARD_LIBRARY[status.cardId].name)} · ${["pumpkin", "asparagus", "sweet_potato"].includes(status.type) ? "심음" : "예약"}</span>`).join("")}</div>` : ""}
    `;
    els.playerPanels.append(panel);
  });
}

function renderPhaseTrack() {
  const activeStep = state.gameOver ? "draw" : state.phase;
  els.phaseSteps.forEach((step) => step.classList.toggle("active", step.dataset.step === activeStep));
}

function renderOpponentSeats(visiblePlayer, changedPlayerIds = new Set()) {
  els.opponentSeats.innerHTML = "";
  state.players.filter((player) => player.id !== visiblePlayer?.id).forEach((player) => {
    const seat = document.createElement("article");
    seat.className = "opponent-seat";
    seat.dataset.playerId = player.id;
    seat.classList.toggle("active", player.id === state.currentPlayerId);
    seat.classList.toggle("state-updated", changedPlayerIds.has(player.id));
    const backs = Array.from({ length: player.hand.length }, (_, index) =>
      `<span class="card-back" style="transform:rotate(${(index - 2) * 2}deg)"></span>`).join("");
    seat.innerHTML = `
      <div>
        <p class="zone-label">${escapeHtml(player.name)} · ${player.controller === "ai" ? "AI" : "로컬"}</p>
        <div class="card-backs">${backs}</div>
      </div>
      <div class="pile-row" aria-label="${escapeHtml(player.name)} 카드 더미">
        <div class="pile-stack"><span>${player.deck.length}</span><small>덱</small></div>
        <div class="pile-stack discard"><span>${player.discard.length}</span><small>버림</small></div>
        <div class="pile-stack buried"><span>${player.buried.length}</span><small>묻음</small></div>
      </div>
    `;
    els.opponentSeats.append(seat);
  });
}

function getPhaseText() {
  if (state.gameOver) {
    const winner = playerById(state.winnerId);
    return `${winner?.name ?? "누군가"} 승리!`;
  }
  if (state.handoffPending) return `${activePlayer().name}님의 손패 인계를 기다리고 있습니다.`;
  if (state.actionPending && activePlayer().controller === "local") return "카드 효과를 처리하고 있습니다.";
  if (activePlayer().controller === "ai") return "AI가 수를 고르는 중입니다.";
  if (state.phase === "harvest" && activePlayer().statuses.some((status) => status.type === "cucumber")) return "오이 효과: 정원 카드를 누르면 무작위로 수확합니다.";
  if (state.phase === "harvest") return "정원 줄에서 카드 1장을 가져오세요.";
  return state.turnLocked ? "당근 효과로 더 이상 카드를 낼 수 없습니다." : "낼 수 있는 카드를 사용하거나 턴을 끝내세요.";
}

function renderGarden() {
  els.garden.innerHTML = "";
  els.garden.classList.toggle("compact-grid", compactCardQuery.matches);
  if (compactCardQuery.matches) {
    groupedCards(state.garden).forEach(({ cardId, count, firstIndex }, displayIndex) => {
      els.garden.append(createCompactCard(cardId, {
        count,
        onClick: () => takeGardenCard(firstIndex),
        disabled: state.actionPending || state.handoffPending || state.phase !== "harvest" || activePlayer().controller !== "local" || state.gameOver,
        wakeIndex: displayIndex
      }));
    });
    return;
  }
  state.garden.forEach((cardId, index) => {
    els.garden.append(createCard(cardId, {
      onClick: () => takeGardenCard(index),
      disabled: state.actionPending || state.handoffPending || state.phase !== "harvest" || activePlayer().controller !== "local" || state.gameOver
    }));
  });
}

function renderHand(player) {
  els.hand.innerHTML = "";
  els.hand.classList.toggle("compact-grid", compactCardQuery.matches);
  if (!player) {
    els.hand.innerHTML = '<div class="hidden-hand-message">플레이어가 확인할 때까지 손패가 가려집니다.</div>';
    return;
  }
  if (compactCardQuery.matches) {
    groupedCards(player.hand).forEach(({ cardId, count, firstIndex }, displayIndex) => {
      const playable = !state.actionPending && !state.handoffPending && player.controller === "local" && state.phase === "play" && activePlayer().id === player.id && canPlay(player, cardId);
      els.hand.append(createCompactCard(cardId, {
        count,
        onClick: () => playHumanCard(firstIndex),
        disabled: !playable,
        playable,
        wakeIndex: displayIndex
      }));
    });
    return;
  }
  player.hand.forEach((cardId, index) => {
    const playable = !state.actionPending && !state.handoffPending && player.controller === "local" && state.phase === "play" && activePlayer().id === player.id && canPlay(player, cardId);
    const card = createCard(cardId, {
      onClick: () => playHumanCard(index),
      disabled: !playable,
      playable
    });
    card.style.setProperty("--wake-index", index);
    els.hand.append(card);
  });
}

function groupedCards(cards) {
  const groups = new Map();
  cards.forEach((cardId, index) => {
    const group = groups.get(cardId);
    if (group) {
      group.count += 1;
    } else {
      groups.set(cardId, { cardId, count: 1, firstIndex: index });
    }
  });
  return [...groups.values()];
}

function createCompactCard(cardId, options = {}) {
  const card = CARD_LIBRARY[cardId];
  const button = document.createElement("button");
  button.className = "compact-card";
  button.type = "button";
  button.style.setProperty("--accent", card.accent);
  button.style.setProperty("--wake-index", options.wakeIndex ?? 0);
  button.disabled = Boolean(options.disabled);
  if (options.playable) button.classList.add("can-use");
  if (options.disabled) button.classList.add("unavailable");
  button.setAttribute("aria-label", `${card.name} ${options.count > 1 ? `${options.count}장, ` : ""}${card.text}`);
  button.innerHTML = `
    <span class="compact-card-art" aria-hidden="true"><img src="${card.art}" alt="" draggable="false"></span>
    <span class="compact-card-name">${card.name}</span>
    <span class="compact-card-rule">${COMPACT_RULES[cardId]}</span>
    ${options.count > 1 ? `<strong class="compact-card-count">×${options.count}</strong>` : ""}
  `;
  if (options.onClick) button.addEventListener("click", options.onClick);
  return button;
}

function createCard(cardId, options = {}) {
  const card = CARD_LIBRARY[cardId];
  const button = document.createElement("button");
  button.className = "card";
  button.classList.add(card.type === "junk" ? "junk-card" : "veg-card");
  button.type = "button";
  button.style.setProperty("--accent", card.accent);
  button.disabled = Boolean(options.disabled);
  if (options.playable) button.classList.add("can-use");
  if (options.disabled) button.classList.add("unavailable");
  button.setAttribute("aria-label", `${card.name}, ${card.text}`);
  button.innerHTML = `
    <span class="card-heading"><span class="card-name">${card.name}</span><small>${card.english}</small></span>
    <span class="card-art" aria-hidden="true"><img src="${card.art}" alt="" draggable="false"></span>
    <span class="card-text">${card.text}</span>
  `;
  if (options.onClick) button.addEventListener("click", options.onClick);
  return button;
}

els.choiceDialog.addEventListener("cancel", (event) => event.preventDefault());
els.handoffDialog.addEventListener("cancel", (event) => event.preventDefault());
els.resultDialog.addEventListener("cancel", (event) => event.preventDefault());
els.matchCardsDialog.addEventListener("cancel", (event) => event.preventDefault());
els.endTurn.addEventListener("click", endHumanTurn);
els.newGame.addEventListener("click", showTitleScreen);
els.help.addEventListener("click", () => els.helpDialog.showModal());
els.compactLog.addEventListener("click", () => els.logPanel.classList.toggle("compact"));
els.sound.addEventListener("click", () => {
  state.sound = !state.sound;
  els.sound.classList.toggle("sound-on", state.sound);
  els.sound.setAttribute("aria-label", state.sound ? "배경음과 효과음 끄기" : "배경음과 효과음 켜기");
  if (state.sound) {
    startBackgroundMusic();
    playSound("tick");
  } else {
    stopBackgroundMusic();
  }
  showToast(state.sound ? "배경음과 효과음이 켜졌습니다." : "배경음과 효과음이 꺼졌습니다.");
});

els.playerCountControl.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-count]");
  if (!button) return;
  els.playerCountControl.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
  renderRoomSlots(Number(button.dataset.count));
  els.roomError.textContent = "";
});

els.gameModeControl.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-mode]");
  if (!button) return;
  els.gameModeControl.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
  setCustomSetupVisibility(button.dataset.mode);
});

els.openCustomSetup.addEventListener("click", openCustomSetupDialog);
els.closeCustomSetup.addEventListener("click", closeCustomSetupDialog);
els.cancelCustomSetup.addEventListener("click", closeCustomSetupDialog);
els.applyCustomSetup.addEventListener("click", applyCustomSetup);
els.customRuleSelect.addEventListener("change", () => {
  if (customDraft) customDraft.specialRuleId = els.customRuleSelect.value || null;
  renderCustomRuleDescription();
});
els.customBasePreset.addEventListener("click", () => {
  customDraft.gardenCardIds = [...BASE_GARDEN_CARD_IDS];
  els.customSetupError.textContent = "";
  renderCustomVegetablePicker();
});
els.customRandomPreset.addEventListener("click", () => {
  customDraft.gardenCardIds = shuffle([...ALL_GARDEN_CARD_IDS]).slice(0, BASE_GARDEN_CARD_IDS.length);
  els.customSetupError.textContent = "";
  renderCustomVegetablePicker();
});
els.customSetupDialog.addEventListener("close", () => {
  customDraft = null;
});

els.startGame.addEventListener("click", startConfiguredGame);
els.resultRematch.addEventListener("click", () => setupGame(
  state.roomConfig,
  state.gameOptions.mode === "custom" ? state.gameOptions : { mode: state.gameOptions.mode }
));
els.resultLobby.addEventListener("click", showTitleScreen);
els.handoffConfirm.addEventListener("click", () => {
  if (privateHandoffResolver) {
    const resolve = privateHandoffResolver;
    privateHandoffResolver = null;
    els.handoffDialog.close();
    resolve();
    return;
  }
  const player = activePlayer();
  if (!player || player.controller !== "local") return;
  state.handoffPending = false;
  state.visibleHandPlayerId = player.id;
  els.handoffDialog.close();
  render();
  window.setTimeout(flashTurnArrival, 120);
});

compactCardQuery.addEventListener("change", () => {
  if (state.players.length > 0 && !els.gameShell.hidden) render();
});

els.customRuleSelect.innerHTML = [
  '<option value="">특수 규칙 없음</option>',
  ...Object.entries(SPECIAL_RULES).map(([id, rule]) => `<option value="${id}">${rule.name}</option>`)
].join("");
renderCustomSummary();
renderRoomSlots(2);
