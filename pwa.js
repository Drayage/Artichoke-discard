if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.warn("PWA 오프라인 기능을 시작하지 못했습니다.", error);
    });
  });
}
