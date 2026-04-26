export default async function handler(req, res){

  // 🔐 later: add auth token check

  const orders = [
    {
      id: "demo_123",
      revenue: 140,
      status: "paid"
    }
  ];

  res.json({ orders });
}
