import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res){

  if(req.method !== "POST"){
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { cart } = req.body;

  try {

    const line_items = cart.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : []
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,

      metadata: {
        source: "HUGS_SAAS_PLATFORM"
      },

      shipping_address_collection: {
        allowed_countries: ["US"]
      },

      success_url: `${req.headers.origin}/success.html`,
      cancel_url: `${req.headers.origin}/shop.html`
    });

    res.json({ url: session.url });

  } catch(err){
    console.error(err);
    res.status(500).json({ error: "Checkout session failed" });
  }
}
