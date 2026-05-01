* =========================
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
