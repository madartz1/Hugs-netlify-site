import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res){

  const event = req.body;

  if(event.type === "checkout.session.completed"){

    const session = event.data.object;

    const order = {
      id: session.id,
      email: session.customer_details?.email,
      amount: session.amount_total,
      status: "paid",
      created: new Date().toISOString()
    };

    // 👉 SAVE TO DATABASE
    console.log("ORDER:", order);
  }

  res.json({ received: true });
}
