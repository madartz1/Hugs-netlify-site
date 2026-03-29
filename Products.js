const products = [
  {
    id: "time-4-healing-hoodie",
    name: "HUGS – Time 4 Healing Hoodie",
    price: 70,
    image: "/assets/hugs-time-4-healing-front.jpg",
    gallery: [
      "/assets/hugs-time-4-healing-front.jpg",
      "/assets/hugs-time-4-healing-back.jpg",
      "/assets/hugs-time-4-healing-model-1.jpg",
      "/assets/hugs-time-4-healing-model-2.jpg"
    ],
    description:
      "A premium hoodie designed to represent patience, recovery, and personal healing. Proceeds help support community wellness initiatives.",
    buyLink: "https://buy.stripe.com/YOUR_STRIPE_LINK_1"
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
      "A community-first hoodie built around dignity, care, and visible impact. HUGS stands for Help Under Good Service.",
    buyLink: "https://buy.stripe.com/YOUR_STRIPE_LINK_2"
  }
];

window.products = products;
