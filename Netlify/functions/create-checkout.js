const stripe = require("stripe")("const stripe = require("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")(process.env.STRIPE_SECRET_KEY);

exports.handler = async () => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Send a Hug ❤️",
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],

      success_url: "https://hugslinks.com/create-hug.html",
      cancel_url: "https://hugslinks.com/send-a-hug",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
