import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await req.json();
    const {
      senderName,
      senderEmail,
      recipientName,
      recipientEmail,
      occasion,
      message
    } = body || {};

    if (!senderName || !senderEmail || !recipientName || !recipientEmail) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const successUrl = `${process.env.URL}/send-a-hug-success.html?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.URL}/send-a-hug.html?canceled=1`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: senderEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'HUGS eCard - Send a Hug',
              description: `Digital HUGS ecard for ${recipientName}`
            },
            unit_amount: 1000
          },
          quantity: 1
        }
      ],
      metadata: {
        senderName,
        senderEmail,
        recipientName,
        recipientEmail,
        occasion: occasion || '',
        message: message || ''
      }
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
