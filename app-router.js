/* =========================
   🧠 HUGS LAYOUT SHELL v2
   (NO DESIGN CHANGES — ONLY ENGINE)
========================= */

(function () {

  if (window.__HUGS_SHELL_V2__) return;
  window.__HUGS_SHELL_V2__ = true;

  const app = document.getElementById("app");

  if (!app) {
    console.error("Missing #app container");
    return;
  }

  /* =========================
     ROUTES
  ========================= */

  const routes = {
    "/": () => load("/pages/home.html"),
    "/shop": () => load("/pages/shop.html"),
    "/product/:id": (id) => loadProduct(id)
  };

  /* =========================
     LINK INTERCEPTION
  ========================= */

  document.addEventListener("click", (e) => {

    const link = e.target.closest("a[href]");

    if (!link) return;

    const href = link.getAttribute("href");

    // ignore external links
    if (
      href.startsWith("http") ||
      href.startsWith("#") ||
      href.startsWith("mailto:")
    ) return;

    e.preventDefault();
    navigate(href);
  });

  /* =========================
     NAVIGATION CORE
  ========================= */

  function navigate(path) {
    history.pushState({}, "", path);
    router();
  }

  window.addEventListener("popstate", router);

  /* =========================
     ROUTER ENGINE
  ========================= */

  function router() {

    const path = window.location.pathname;

    // product route
    if (path.startsWith("/product/")) {
      const id = path.split("/product/")[1];
      return routes["/product/:id"](id);
    }

    // normal routes
    if (routes[path]) {
      return routes[path]();
    }

    // fallback
    load("/pages/home.html");
  }

  /* =========================
     PAGE LOADER (WITH TRANSITION)
  ========================= */

  async function load(url) {

    app.classList.add("page-out");

    await new Promise(r => setTimeout(r, 120));

    const res = await fetch(url);
    const html = await res.text();

    app.innerHTML = html;

    app.classList.remove("page-out");
    app.classList.add("page-in");

    setTimeout(() => app.classList.remove("page-in"), 250);
  }

  /* =========================
     PRODUCT VIEW
  ========================= */

  function loadProduct(id) {

    const product = window.products?.find(p => p.id === id);

    if (!product) {
      app.innerHTML = `<div class="wrap"><h2>Product not found</h2></div>`;
      return;
    }

    app.innerHTML = `
      <div class="wrap">
        <h1>${product.name}</h1>

        <img src="${product.image}"
             style="max-width:420px;border-radius:16px;" />

        <p style="opacity:.8;margin-top:10px;">
          ${product.description}
        </p>

        <h2>$${product.price}</h2>

        <a class="btn primary"
           href="${product.buyLink}"
           target="_blank">
          Buy Now
        </a>
      </div>
    `;
  }

  /* =========================
     START APP
  ========================= */

  router();

})();
