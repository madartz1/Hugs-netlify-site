const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

function generateHugId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

exports.handler = async () => {
  try {
    const hugId = generateHugId();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Send a Hug ❤️",
              description: "A digital moment of care and connection"
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],

      success_url: `https://hugslinks.com/create-hug.html?hug=${hugId}`,
      cancel_url: `https://hugslinks.com/send-a-hug`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
