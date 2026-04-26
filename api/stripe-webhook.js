import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res){

  const event = req.body;

  try {

    if(event.type === "checkout.session.completed"){

      const session = event.data.object;

      const order = {
        id: session.id,
        amount_total: session.amount_total,
        customer_email: session.customer_details?.email,
        status: "paid",
        created: new Date().toISOString()
      };

      // 🔥 SAVE TO DATABASE (Supabase/Firebase/etc)
      console.log("NEW ORDER:", order);
    }

    res.json({ received: true });

  } catch(err){
    console.error(err);
    res.status(500).json({ error: "Webhook error" });
  }
}
