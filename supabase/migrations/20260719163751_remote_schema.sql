CREATE TABLE produits (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  prix DECIMAL(10,2) NOT NULL
);

CREATE TABLE produit_images (
  id SERIAL PRIMARY KEY,
  produit_id INTEGER REFERENCES produits(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  ordre INTEGER DEFAULT 0
);

-- ALTER TABLE produits ENABLE ROW LEVEL SECURITY; -- disabled for non-Postgres compatibility

-- ALTER TABLE produit_images ENABLE ROW LEVEL SECURITY; -- disabled for non-Postgres compatibility