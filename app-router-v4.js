(function () {

  if (window.__HUGS_ROUTER_V4__) return;
  window.__HUGS_ROUTER_V4__ = true;

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

  function cleanPath(path) {
    if (!path) return "/";
    return path.replace(/\/+$/, "") || "/";
  }

  /* =========================
     PRODUCT ROUTE
  ========================= */

  function getProductId(path) {
    const parts = cleanPath(path).split("/");
    if (parts[1] === "product" && parts[2]) {
      return parts[2];
    }
    return null;
  }

  /* =========================
     EXECUTE SCRIPTS (CRITICAL FIX)
  ========================= */

  function runScripts(container) {
    const scripts = container.querySelectorAll("script");

    scripts.forEach(oldScript => {
      const newScript = document.createElement("script");

      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }

      document.body.appendChild(newScript);
      oldScript.remove();
    });
  }

  /* =========================
     LOAD VIEW
  ========================= */

  async function loadView(file, path) {

    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error();

      const html = await res.text();
      app.innerHTML = html;

      runScripts(app); // 🔥 FIX

      runPageScripts(path);

    } catch {
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

    let path = cleanPath(window.location.pathname);

    // normalize .html routes
    if (path.endsWith(".html")) {
      path = path.replace(".html", "");
    }

    /* PRODUCT */
    const productId = getProductId(path);

    if (productId) {
      const res = await fetch("/pages/product.html");
      const html = await res.text();

      app.innerHTML = html;

      runScripts(app); // 🔥 FIX

      if (window.renderProduct) {
        window.renderProduct(productId);
      }

      return;
    }

    /* STATIC */
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
     LINK INTERCEPTION (FIXED)
  ========================= */

  document.addEventListener("click", (e) => {

    const a = e.target.closest("a");
    if (!a) return;

    const href = a.getAttribute("href");

    if (!href) return;

    // ✅ allow external links + forced external
    if (
      href.startsWith("http") ||
      href.startsWith("#") ||
      a.target === "_blank" ||
      a.hasAttribute("data-external")
    ) {
      return;
    }

    e.preventDefault();
    navigate(href);

  });

  /* =========================
     BACK BUTTON
  ========================= */

  window.addEventListener("popstate", handleRoute);

  /* =========================
     PAGE HOOKS
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
     GLOBAL API
  ========================= */

  window.HUGSRouter = {
    go: navigate,
    refresh: handleRoute
  };

})();
