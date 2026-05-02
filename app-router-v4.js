(function () {

  if (window.__HUGS_ROUTER_V5__) return;
  window.__HUGS_ROUTER_V5__ = true;

  const app = document.getElementById("app");

  /* =========================
     ROUTES
  ========================= */

  const routes = {
    "/": "/pages/home.html",
    "/shop": "/pages/shop.html"
  };

  /* =========================
     CLEAN PATH
  ========================= */

  function clean(path) {
    if (!path) return "/";
    return path.replace(/\/+$/, "") || "/";
  }

  /* =========================
     PRODUCT ROUTE
  ========================= */

  function getProductId(path) {
    const parts = clean(path).split("/");
    if (parts[1] === "product" && parts[2]) {
      return parts[2];
    }
    return null;
  }

  /* =========================
     LOAD VIEW
  ========================= */

  async function load(file, path) {
    const res = await fetch(file);
    if (!res.ok) {
      app.innerHTML = "<h1>Page not found</h1>";
      return;
    }

    const html = await res.text();
    app.innerHTML = html;

    if (path === "/shop" && window.initShop) {
      window.initShop();
    }
  }

  /* =========================
     NAVIGATION
  ========================= */

  function go(path) {
    history.pushState({}, "", path);
    route();
  }

  /* =========================
     ROUTER CORE
  ========================= */

  async function route() {

    const path = clean(window.location.pathname);

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

    /* NORMAL ROUTES */
    const file = routes[path];

    if (!file) {
      app.innerHTML = "<h1>404 Not Found</h1>";
      return;
    }

    await load(file, path);
  }

  /* =========================
     LINK INTERCEPT
  ========================= */

  document.addEventListener("click", (e) => {

    const a = e.target.closest("a");
    if (!a) return;

    const href = a.getAttribute("href");

    if (!href) return;

    /* ignore external */
    if (
      href.startsWith("http") ||
      href.startsWith("#") ||
      href.includes(".html")
    ) return;

    e.preventDefault();
    go(href);
  });

  /* =========================
     BACK/FORWARD
  ========================= */

  window.addEventListener("popstate", route);

  /* =========================
     INIT
  ========================= */

  route();

  /* =========================
     GLOBAL API
  ========================= */

  window.HUGS = {
    go,
    refresh: route
  };

})();
