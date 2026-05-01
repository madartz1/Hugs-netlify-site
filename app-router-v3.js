(function () {

  if (window.__HUGS_ROUTER_V4__) return;
  window.__HUGS_ROUTER_V4__ = true;

  const app = document.getElementById("app");

  /* =========================
     ROUTES (STATIC PAGES)
  ========================= */

  const routes = {
    "/": "/pages/home.html",
    "/shop": "/pages/shop.html"
  };

  /* =========================
     CLEAN PATH
  ========================= */

  function cleanPath(path) {
    if (!path) return "/";
    return path.replace(/\/+$/, "") || "/";
  }

  /* =========================
     PRODUCT ROUTE PARSER
  ========================= */

  function getProductId(path) {
    const parts = cleanPath(path).split("/");
    if (parts[1] === "product" && parts[2]) {
      return parts[2];
    }
    return null;
  }

  /* =========================
     LOAD HTML VIEW
  ========================= */

  async function loadView(file, path) {

    try {
      const res = await fetch(file);

      if (!res.ok) throw new Error("Page not found");

      const html = await res.text();
      app.innerHTML = html;

      runPageScripts(path);

    } catch (err) {
      app.innerHTML = `
        <div style="padding:40px;text-align:center">
          <h1>404</h1>
          <p>Page not found</p>
        </div>
      `;
    }
  }

  /* =========================
     NAVIGATION
  ========================= */

  function navigate(path) {
    history.pushState({}, "", path);
    handleRoute();
  }

  /* =========================
     ROUTE HANDLER
  ========================= */

  async function handleRoute() {

    const path = cleanPath(window.location.pathname);

    /* PRODUCT ROUTE */
    const productId = getProductId(path);

    if (productId) {
      const res = await fetch("/pages/product.html");
      const html = await res.text();

      app.innerHTML = html;

      if (window.renderProduct) {
        window.renderProduct(productId);
      }

      return;
    }

    /* STATIC ROUTES */
    const file = routes[path];

    if (!file) {
      app.innerHTML = `
        <div style="padding:40px;text-align:center">
          <h1>404</h1>
          <p>Route not found</p>
        </div>
      `;
      return;
    }

    await loadView(file, path);
  }

  /* =========================
     INTERCEPT LINKS
  ========================= */

  document.addEventListener("click", (e) => {

    const a = e.target.closest("a");
    if (!a) return;

    const href = a.getAttribute("href");

    if (!href) return;
    if (href.startsWith("http") || href.startsWith("#")) return;

    e.preventDefault();
    navigate(href);
  });

  /* =========================
     BACK/FORWARD
  ========================= */

  window.addEventListener("popstate", handleRoute);

  /* =========================
     PAGE HOOK SYSTEM
  ========================= */

  function runPageScripts(path) {

    if (path === "/shop") {
      if (window.initShop) window.initShop();
    }

  }

  /* =========================
     INIT
  ========================= */

  handleRoute();

  /* =========================
     GLOBAL API (optional)
  ========================= */

  window.HUGSRouter = {
    go: navigate,
    refresh: handleRoute
  };

})();
