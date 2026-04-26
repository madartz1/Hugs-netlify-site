import { stripe } from "../lib/stripe.js";
import { saveOrder } from "../lib/db.js";

export default async function handler(req, res) {
  const event = req.body;

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const order = {
        id: session.id,
        email: session.customer_details?.email || null,
        amount: session.amount_total,
        currency: session.currency,
        status: "paid",
        createdAt: new Date().toISOString()
      };

      await saveOrder(order);
    }

    res.json({ received: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Webhook failed" });
  }
}
