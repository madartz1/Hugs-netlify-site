/* =========================
   🧠 PRODUCT DATABASE
========================= */

const products = [
  {
    id: "time-4-healing-hoodie",
    name: "HUGS – Time 4 Healing Hoodie",
    price: 70,
    image: "/assets/hugs-time-4-healing-front.png",
    gallery: [
      "/assets/hugs-time-4-healing-front.png",
      "/assets/hugs-time-4-healing-back.jpg",
      "/assets/hugs-time-4-healing-model-1.jpg",
      "/assets/hugs-time-4-healing-model-2.jpg"
    ],
    description:
      "A premium hoodie designed to represent patience, recovery, and personal healing. Every purchase helps support community wellness initiatives through HUGS.",
    buyLink: "https://buy.stripe.com/aFabJ0fpq1w4d0P18c8ww01",
    limited: true
  },

  {
    id: "hugs-community-hoodie",
    name: "HUGS Community Hoodie",
    price: 70,
    image: "/assets/hugs-community-front.jpg",
    gallery: [
      "/assets/hugs-community-front.jpg",
      "/assets/hugs-community-back.jpg",
      "/assets/hugs-community-model-1.jpg",
      "/assets/hugs-community-model-2.jpg"
    ],
    description:
      "A premium community-first hoodie built around dignity, care, resilience and visible impact. HUGS stands for Help Under Good Service.",
    buyLink: "https://buy.stripe.com/8x2bJ06SU6Qo4ujg368ww02"
  }
];

window.products = products;

/* =========================
   🛒 CART STATE
========================= */

let cart = JSON.parse(localStorage.getItem("hugs_cart")) || [];

/* =========================
   SAVE CART
========================= */

function saveCart(){
  localStorage.setItem("hugs_cart", JSON.stringify(cart));
  updateCartCount();
}

/* =========================
   ADD TO CART (SAFE + MERGE LOGIC)
========================= */

function addToCart(product){

  const existing = cart.find(item => item.id === product.id);

  if(existing){
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
}

/* =========================
   REMOVE ITEM
========================= */

function removeItem(id){
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

/* =========================
   CART COUNT (FIXED FOR QUANTITY)
========================= */

function updateCartCount(){
  const el = document.getElementById("cartCount");
  if(el){
    el.textContent = cart.reduce((sum,item)=>sum + item.quantity, 0);
  }
}

/* init */
updateCartCount();

/* =========================
   CART DRAWER CONTROLS
========================= */

function openCart(){
  document.getElementById("cartDrawer").classList.add("open");
  renderCart();
}

function closeCart(){
  document.getElementById("cartDrawer").classList.remove("open");
}

/* =========================
   RENDER CART UI
========================= */

function renderCart(){
  const container = document.getElementById("cartItems");
  if(!container) return;

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" />

      <div>
        <p>${item.name}</p>
        <p>$${item.price} × ${item.quantity}</p>

        <button onclick="removeItem('${item.id}')">
          Remove
        </button>
      </div>
    </div>
  `).join("");
}

/* =========================
   CHECKOUT (READY FOR STRIPE UPGRADE)
========================= */

function checkout(){

  if(cart.length === 0){
    alert("Cart is empty");
    return;
  }

  /* CURRENT SAFE FALLBACK (your existing Stripe links) */
  window.location.href = cart[0].buyLink;

  /* 🔥 FUTURE UPGRADE HOOK (Stripe Session API)
  fetch("/api/create-checkout-session", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ cart })
  })
  .then(res => res.json())
  .then(data => {
    window.location.href = data.url;
  });
  */
}

/* =========================
   🛍️ MICRO INTERACTIONS
========================= */

document.addEventListener("click", function(e){

  const btn = e.target.closest(".add-cart");
  if(!btn) return;

  const product = products.find(p => p.id === btn.dataset.id);
  if(!product) return;

  addToCart(product);

  /* UI micro animation */
  btn.classList.add("clicked");

  const originalText = btn.innerHTML;
  btn.innerHTML = "✓ Added";

  setTimeout(()=>{
    btn.classList.remove("clicked");
    btn.innerHTML = originalText;
  },900);
});

/* =========================
   FLOATING ANIMATION
========================= */

function createFloatingItem(sourceBtn){

  const rect = sourceBtn.getBoundingClientRect();

  const item = document.createElement("div");
  item.className = "floating-item";
  item.innerHTML = "🛍️";

  item.style.left = rect.left + rect.width/2 + "px";
  item.style.top = rect.top + "px";

  document.body.appendChild(item);

  setTimeout(()=>item.remove(),900);
}
