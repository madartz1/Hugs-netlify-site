/* =========================
   🧠 HUGS APP ROUTER CORE
   (NO DESIGN CHANGES)
========================= */

(function () {

  if (window.__HUGS_APP__) return;
  window.__HUGS_APP__ = true;

  const root = document.getElementById("app");

  if (!root) {
    console.error("Missing #app root container");
    return;
  }

  /* =========================
     ROUTES
  ========================= */

  const routes = {

    "/": () => loadPage("/pages/home.html"),
    "/shop": () => loadPage("/pages/shop.html"),
    "/product/:id": (id) => loadProduct(id)

  };

  /* =========================
     NAV INTERCEPT (NO RELOAD)
  ========================= */

  document.addEventListener("click", (e) => {

    const link = e.target.closest("a[href]");

    if (!link) return;

    const href = link.getAttribute("href");

    if (
      href.startsWith("http") ||
      href.startsWith("mailto") ||
      href.startsWith("#")
    ) return;

    e.preventDefault();
    navigate(href);
  });

  /* =========================
     NAVIGATE
  ========================= */

  function navigate(path) {
    history.pushState({}, "", path);
    router();
  }

  window.addEventListener("popstate", router);

  /* =========================
     ROUTER
  ========================= */

  function router() {

    const path = window.location.pathname;

    // PRODUCT ROUTE
    if (path.startsWith("/product/")) {
      const id = path.split("/product/")[1];
      return routes["/product/:id"](id);
    }

    // STATIC ROUTES
    if (routes[path]) {
      return routes[path]();
    }

    // fallback
    loadPage("/pages/home.html");
  }

  /* =========================
     LOAD HTML INTO SHELL
  ========================= */

  async function loadPage(url) {
    const res = await fetch(url);
    const html = await res.text();
    root.innerHTML = html;
  }

  /* =========================
     PRODUCT VIEW
  ========================= */

  function loadProduct(id) {

    const product = window.products?.find(p => p.id === id);

    if (!product) {
      root.innerHTML = "<h2>Product not found</h2>";
      return;
    }

    root.innerHTML = `
      <div class="wrap">
        <h1>${product.name}</h1>
        <img src="${product.image}" style="max-width:400px;border-radius:16px;" />
        <p>${product.description}</p>
        <h2>$${product.price}</h2>

        <a class="btn primary" href="${product.buyLink}" target="_blank">
          Buy Now
        </a>
      </div>
    `;
  }

  /* =========================
     START
  ========================= */

  router();

})();
