/* =========================
   💙 GLOBAL FLOATING HEART ENGINE
   SAFE FOR ALL PAGES
========================= */

(function () {

  // prevent duplicate intervals if script loads twice
  if (window.__HUGS_HEART_ENGINE__) return;
  window.__HUGS_HEART_ENGINE__ = true;

  const container = document.querySelector(".blue-hearts-container");

  if (!container) return;

  function createHeart() {
    const el = document.createElement("div");
    el.className = "blue-heart";
    el.innerHTML = "❤";

    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = (10 + Math.random() * 18) + "px";
    el.style.animationDuration = (8 + Math.random() * 10) + "s";

    // soft glow variation
    el.style.opacity = (0.4 + Math.random() * 0.6);

    container.appendChild(el);

    setTimeout(() => el.remove(), 20000);
  }

  // spawn rate (balanced for performance)
  setInterval(createHeart, 900);

})();
/* =========================
   💙 HUGS REACTIVE HEART SYSTEM
   (CLICK + PAGE + CART REACTIONS)
========================= */

(function () {

  if (window.__HUGS_REACTIVE_HEARTS__) return;
  window.__HUGS_REACTIVE_HEARTS__ = true;

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

  if (path === "/" || path === "/index.html") {
    intensity = 1.2;
  }

  /* =========================
     CREATE HEART
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
     BASE HEART FLOW
  ========================= */

  setInterval(() => {
    createHeart(null, null, intensity);
  }, 900 / intensity);

  /* =========================
     CLICK REACTION SYSTEM
  ========================= */

  document.addEventListener("click", (e) => {

    const target = e.target;

    // 🛒 BUY BUTTON
    if (target.closest(".btn.primary")) {
      burst(e.pageX, e.pageY, 12);
      return;
    }

    // 🛍 ADD TO CART
    if (target.closest(".add-cart")) {
      burst(e.pageX, e.pageY, 18);
      return;
    }

    // 🌐 OPEN STORE BUTTON
    if (target.closest("a[href*='shop'], a[href*='open-store']")) {
      burst(e.pageX, e.pageY, 25);
      return;
    }

  });

  /* =========================
     HEART BURST EFFECT
  ========================= */

  function burst(x, y, count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        createHeart(
          x + (Math.random() * 60 - 30),
          y + (Math.random() * 60 - 30),
          1.5
        );
      }, i * 30);
    }
  }

  /* =========================
     CART REACTION HOOK (GLOBAL)
  ========================= */

  window.hugsHeartBurst = function (x, y) {
    burst(x, y, 20);
  };

})();
