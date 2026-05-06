CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  url TEXT NOT NULL,
  FOREIGN KEY(project_id) REFERENCES projects(id)
);
CREATE TABLE masks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  photo_id INTEGER NOT NULL,
  label TEXT NOT NULL,
  category TEXT NOT NULL,
  geometry_json TEXT NOT NULL,
  FOREIGN KEY(photo_id) REFERENCES photos(id)
);
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  manufacturer TEXT NOT NULL,
  line TEXT NOT NULL,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  color TEXT,
  style TEXT
);
CREATE TABLE selections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mask_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  option_set TEXT NOT NULL DEFAULT 'Option 1',
  FOREIGN KEY(mask_id) REFERENCES masks(id),
  FOREIGN KEY(product_id) REFERENCES products(id)
);
