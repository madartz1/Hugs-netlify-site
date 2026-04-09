import { getStore } from '@netlify/blobs';

export default async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return json({ valid: false, error: 'Missing token' }, 400);
  }

  try {
    const store = getStore('hug-tokens');
    const record = await store.get(token, { type: 'json' });

    if (!record || !record.paid) {
      return json({ valid: false }, 404);
    }

    return json({
      valid: true,
      senderName: record.senderName,
      recipientName: record.recipientName,
      occasion: record.occasion,
      message: record.message
    });
  } catch (error) {
    return json({ valid: false, error: error.message }, 500);
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
