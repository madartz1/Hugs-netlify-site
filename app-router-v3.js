(function () {

  if (window.__HUGS_ROUTER_V3__) return;
  window.__HUGS_ROUTER_V3__ = true;

  const app = document.getElementById("app");

  /* =========================
     ROUTES
  ========================= */

  const routes = {
    "/": "/pages/home.html",
    "/shop": "/pages/shop.html",
    "/product": "/pages/product.html"
  };

  /* =========================
     FETCH VIEW
  ========================= */

  async function loadView(path) {

    let file = routes[path];

    if (!file) {
      app.innerHTML = "<h1>404 Not Found</h1>";
      return;
    }

    const res = await fetch(file);
    const html = await res.text();

    app.innerHTML = html;

    runPageScripts(path);
  }

  /* =========================
     PRODUCT ROUTING (/product/:id)
  ========================= */

  function parseProductRoute(url) {
    const parts = url.split("/");

    if (parts[1] === "product" && parts[2]) {
      return parts[2];
    }
    return null;
  }

  /* =========================
     NAVIGATION OVERRIDE
  ========================= */

  function navigate(path) {
    history.pushState({}, "", path);
    handleRoute();
  }

  /* =========================
     ROUTE HANDLER
  ========================= */

  async function handleRoute() {

    const path = window.location.pathname;

    const productId = parseProductRoute(path);

    if (productId) {
      const res = await fetch("/pages/product.html");
      const html = await res.text();

      app.innerHTML = html;

      window.renderProduct(productId);
      return;
    }

    await loadView(path);
  }

  /* =========================
     INTERCEPT LINKS
  ========================= */

  document.addEventListener("click", (e) => {

    const a = e.target.closest("a");

    if (!a) return;

    const href = a.getAttribute("href");

    if (!href || href.startsWith("http")) return;

    e.preventDefault();
    navigate(href);
  });

  /* =========================
     BACK/FORWARD SUPPORT
  ========================= */

  window.addEventListener("popstate", handleRoute);

  /* =========================
     PAGE INIT
  ========================= */

  handleRoute();

  /* =========================
     PAGE SCRIPTS HOOK
  ========================= */

  function runPageScripts(path) {

    if (path === "/shop") {
      if (window.initShop) window.initShop();
    }

  }

})();
