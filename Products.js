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
   🛍️ MICRO CART SYSTEM
   ========================= */

document.addEventListener("click", function(e){
  const btn = e.target.closest(".add-cart");
  if(!btn) return;

  btn.classList.add("clicked");

  const originalText = btn.innerHTML;
  btn.innerHTML = "✓ Added";

  createFloatingItem(btn);

  setTimeout(()=>{
    btn.classList.remove("clicked");
    btn.innerHTML = originalText;
  },1200);
});

function createFloatingItem(sourceBtn){
  const rect = sourceBtn.getBoundingClientRect();

  const item = document.createElement("div");
  item.className = "floating-item";
  item.innerHTML = "🛍️";

  item.style.left = rect.left + rect.width/2 + "px";
  item.style.top = rect.top + "px";

  document.body.appendChild(item);

  setTimeout(()=>{
    item.remove();
  },900);
}
