import { getProducts } from "../lib/db.js";

export default async function handler(req, res) {
  const products = await getProducts();
  res.json(products);
}
