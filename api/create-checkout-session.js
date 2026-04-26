import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { cart } = req.body;

  const line_items = cart.map(item => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: [item.image || ""]
      },
      unit_amount: item.price * 100
    },
    quantity: item.quantity || 1
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${req.headers.origin}/success.html`,
      cancel_url: `${req.headers.origin}/shop.html`
    });

    res.status(200).json({ url: session.url });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
