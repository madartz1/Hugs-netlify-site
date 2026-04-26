import { getOrders } from "../lib/db.js";

export default async function handler(req, res) {
  const orders = await getOrders();
  res.json(orders);
}
