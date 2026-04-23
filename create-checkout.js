const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "HUGS Digital Hug ❤️",
            },
            unit_amount: 1000, // $10
          },
          quantity: 1,
        },
      ],

      // 🔥 THIS IS THE KEY (your control point)
      success_url: "https://hugslinks.com/create-hug.html",

      cancel_url: "https://hugslinks.com/send-a-hug.html",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
