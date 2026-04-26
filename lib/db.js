let orders = [];
let products = [];

export async function saveOrder(order){
  orders.push(order);
}

export async function getOrders(){
  return orders;
}

export async function getProducts(){
  return products;
}

export async function updateProduct(id, data){
  const index = products.findIndex(p => p.id === id);
  if(index !== -1){
    products[index] = { ...products[index], ...data };
  }
}
