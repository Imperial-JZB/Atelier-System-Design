DROP DATABASE IF EXISTS products WITH (FORCE);

CREATE DATABASE products;

DROP TABLE IF EXISTS products, features, styles, related, skus, photos;

CREATE TABLE IF NOT EXISTS products (
  id INTEGER UNIQUE PRIMARY KEY NOT NULL,
  name VARCHAR(64) NOT NULL,
  slogan VARCHAR(128) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(32) NOT NULL,
  default_price VARCHAR(16) NOT NULL
);
\copy products FROM '/Users/Zebib/Documents/rfp/SDC/csvFiles/product.csv' with (format csv,header true, delimiter ',');
CREATE INDEX products_id_index ON products (id);

CREATE TABLE IF NOT EXISTS features (
  id INTEGER UNIQUE PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL,
  feature VARCHAR(64) NOT NULL,
  value VARCHAR(64) NOT NULL
);
\copy features FROM '/Users/Zebib/Documents/rfp/SDC/csvFiles/features.csv' with (format csv,header true, delimiter ',');
CREATE INDEX features_id_index ON features (product_id);

CREATE TABLE IF NOT EXISTS styles (
  id INTEGER UNIQUE PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL,
  name VARCHAR(64) NOT NULL,
  sale_price VARCHAR(32) NOT NULL DEFAULT '0', 
  original_price VARCHAR(32) NOT NULL,
  default_style BOOLEAN NOT NULL DEFAULT FALSE
);
\copy styles FROM '/Users/Zebib/Documents/rfp/SDC/csvFiles/styles.csv' with (format csv,header true, delimiter ',');
CREATE INDEX style_id_index ON styles (id);

CREATE TABLE IF NOT EXISTS related (
  id INTEGER UNIQUE PRIMARY KEY NOT NULL,
  current_product_id INTEGER NOT NULL,
  related_product_id INTEGER NOT NULL
);
\copy related FROM '/Users/Zebib/Documents/rfp/SDC/csvFiles/related.csv' with (format csv,header true, delimiter ',');
CREATE INDEX related_id_index ON related (current_product_id);

CREATE TABLE IF NOT EXISTS skus (
  id INTEGER UNIQUE PRIMARY KEY NOT NULL,
  styleId INTEGER NOT NULL,
  size VARCHAR(8) NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY(styleID) REFERENCES "styles" (id)
);
\copy skus FROM '/Users/Zebib/Documents/rfp/SDC/csvFiles/skus.csv' with (format csv,header true, delimiter ',');
CREATE INDEX skus_id_index ON skus (styleId);

CREATE TABLE IF NOT EXISTS photos (
  id INTEGER UNIQUE PRIMARY KEY NOT NULL,
  styleId INTEGER NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  FOREIGN KEY(styleID) REFERENCES "styles" (id)
);
\copy photos FROM '/Users/Zebib/Documents/rfp/SDC/csvFiles/photos.csv' with (format csv,header true, delimiter ',');
CREATE INDEX photos_id_index ON photos (styleId);

-- $ psql -h localhost -U zebib -d test -a -f /Users/Zebib/Documents/rfp/SDC/server/postgres/Products/schema.sql 