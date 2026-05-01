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
   ⚡ STORE ROUTE CONFIG
========================= */

const OPEN_STORE_URL = "/shop.html";

/* =========================
   🛒 CART STATE
========================= */

let cart = JSON.parse(localStorage.getItem("hugs_cart")) || [];

/* =========================
   SAVE CART + SYNC UI
========================= */

function saveCart(){
  localStorage.setItem("hugs_cart", JSON.stringify(cart));
  syncUI();
}

/* =========================
   ADD TO CART
========================= */

function addToCart(product){

  const item = cart.find(p => p.id === product.id);

  if(item){
    item.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
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
   CART TOTAL
========================= */

function getCartTotal(){
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/* =========================
   CART COUNT
========================= */

function getCartCount(){
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

/* =========================
   UI SYNC
========================= */

function syncUI(){

  const countEl = document.getElementById("cartCount");
  if(countEl){
    countEl.textContent = getCartCount();
  }

  const totalEl = document.getElementById("cartTotal");
  if(totalEl){
    totalEl.textContent = getCartTotal();
  }
}

/* init */
syncUI();

/* =========================
   CART DRAWER CONTROLS
========================= */

function openCart(){
  document.getElementById("cartDrawer")?.classList.add("open");
  renderCart();
}

function closeCart(){
  document.getElementById("cartDrawer")?.classList.remove("open");
}

/* =========================
   RENDER CART
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
        <button onclick="removeItem('${item.id}')">Remove</button>
      </div>
    </div>
  `).join("");

  syncUI();
}

/* =========================
   CHECKOUT (FIXED CLEAN VERSION)
========================= */

async function checkout(){

  if(cart.length === 0){
    alert("Cart is empty");
    return;
  }

  try {

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ cart })
    });

    const data = await res.json();

    if(data.url){
      window.location.href = data.url;
    } else {
      alert("Checkout failed");
    }

  } catch(err){
    console.error(err);
    alert("Checkout error");
  }
}

/* =========================
   MICRO INTERACTIONS
========================= */

document.addEventListener("click", function(e){

  const btn = e.target.closest(".add-cart");
  if(!btn) return;

  const product = products.find(p => p.id === btn.dataset.id);
  if(!product) return;

  addToCart(product);

  btn.classList.add("clicked");

  const original = btn.innerHTML;
  btn.innerHTML = "✓ Added";

  setTimeout(()=>{
    btn.classList.remove("clicked");
    btn.innerHTML = original;
  },900);
});

/* =========================
   FLOATING EFFECT
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
