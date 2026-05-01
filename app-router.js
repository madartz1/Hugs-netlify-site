(function () {

  if (window.__HUGS_APP_ROUTER__) return;
  window.__HUGS_APP_ROUTER__ = true;

  const links = document.querySelectorAll("a[href^='/']");

  links.forEach(link => {
    link.addEventListener("click", async (e) => {

      const url = link.getAttribute("href");

      // ignore external links + Stripe + anchors
      if (
        url.includes("http") ||
        url.includes("#") ||
        url.includes("buy.stripe") ||
        link.target === "_blank"
      ) return;

      e.preventDefault();

      // soft transition effect
      document.body.style.opacity = "0.2";
      document.body.style.transform = "scale(0.98)";
      document.body.style.transition = "0.25s ease";

      setTimeout(() => {
        window.location.href = url;
      }, 180);

    });
  });

})();
