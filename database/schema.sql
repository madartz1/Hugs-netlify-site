-- PRODUCTS TABLE
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT,
  price INT,
  image TEXT,
  inventory INT,
  active BOOLEAN
);

-- ORDERS TABLE
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  email TEXT,
  amount INT,
  currency TEXT,
  status TEXT,
  created_at TIMESTAMP
);
