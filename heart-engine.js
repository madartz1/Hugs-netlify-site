/* =========================
   💙 HUGS UNIFIED HEART SYSTEM
   (BASE + REACTIVE MERGED)
========================= */

(function () {

  // prevent duplicates
  if (window.__HUGS_HEART_SYSTEM__) return;
  window.__HUGS_HEART_SYSTEM__ = true;

  const container = document.querySelector(".blue-hearts-container");
  if (!container) return;

  /* =========================
     PAGE MOOD DETECTION
  ========================= */

  const path = window.location.pathname;

  let intensity = 1;
  let color = "#00e5ff";

  if (path.includes("shop")) {
    intensity = 1.4;
    color = "#00c2ff";
  }

  if (path.includes("open-store")) {
    intensity = 1.8;
    color = "#00f0ff";
  }

  /* =========================
     CORE HEART CREATOR
  ========================= */

  function createHeart(x = null, y = null, boost = 1) {

    const el = document.createElement("div");
    el.className = "blue-heart";
    el.innerHTML = "❤";

    el.style.color = color;

    el.style.left = (x ?? Math.random() * 100) + (x ? "px" : "vw");
    el.style.top = y ? y + "px" : "auto";

    el.style.fontSize = (10 + Math.random() * 18 * boost) + "px";
    el.style.animationDuration = (7 + Math.random() * 8 / boost) + "s";
    el.style.opacity = (0.4 + Math.random() * 0.6);

    container.appendChild(el);

    setTimeout(() => el.remove(), 20000);
  }

  /* =========================
     BASE FLOW (CLEAN)
  ========================= */

  setInterval(() => {
    createHeart(null, null, intensity);
  }, 900 / intensity);

  /* =========================
     CLICK REACTIONS
  ========================= */

  document.addEventListener("click", (e) => {

    const target = e.target;

    // BUY
    if (target.closest(".btn.primary")) {
      burst(e.pageX, e.pageY, 12);
      return;
    }

    // CART
    if (target.closest(".add-cart")) {
      burst(e.pageX, e.pageY, 18);
      return;
    }

    // STORE NAVIGATION
    if (target.closest("a[href*='shop'], a[href*='open-store']")) {
      burst(e.pageX, e.pageY, 25);
      return;
    }

  });

  /* =========================
     HEART BURST SYSTEM
  ========================= */

  function burst(x, y, count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        createHeart(
          x + (Math.random() * 60 - 30),
          y + (Math.random() * 60 - 30),
          1.6
        );
      }, i * 25);
    }
  }

  /* =========================
     GLOBAL ACCESS (FOR CART)
  ========================= */

  window.hugsHeartBurst = function (x, y) {
    burst(x, y, 20);
  };

})();
