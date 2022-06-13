DROP DATABASE IF EXISTS ratings_review WITH (FORCE);

CREATE DATABASE ratings_review;

\c ratings_review

DROP TABLE IF EXISTS characteristic_reviews, characteristics, reviews_photos, reviews;

-- id,product_id,name
CREATE TABLE IF NOT EXISTS characteristics (
  id INTEGER UNIQUE PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL,
  name VARCHAR(225) NOT NULL
);

--id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER UNIQUE PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  date BIGINT DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP),
  -- date VARCHAR(32) NOT NULL DEFAULT extract(epoch from now()),
  summary VARCHAR(255) NOT NULL,
  body VARCHAR(535) NOT NULL,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  response VARCHAR(255) NULL,
  helpfulness INTEGER NOT NULL
);

-- use more file
-- id,characteristic_id,review_id,value
CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id INTEGER UNIQUE PRIMARY KEY NOT NULL,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  FOREIGN KEY (characteristic_id) REFERENCES characteristics(id),
  FOREIGN KEY (review_id) REFERENCES reviews(id),
  value INTEGER NOT NULL
);

--id,review_id,url
CREATE TABLE IF NOT EXISTS reviews_photos (
  id INTEGER UNIQUE PRIMARY KEY NOT NULL,
  review_id INTEGER NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews(id),
  url VARCHAR(225) NOT NULL
);

CREATE INDEX idx_product_id ON reviews(product_id);
CREATE INDEX idx_characteristic_id ON characteristic_reviews(characteristic_id);
CREATE INDEX idx_id ON reviews(id);

COPY characteristics(id, product_id, name) FROM '/Users/johnong/galvanize/imperial-sdc/reviewsCSV/characteristics.csv' DELIMITER ',' CSV Header;

COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/johnong/galvanize/imperial-sdc/reviewsCSV/reviews.csv' DELIMITER ',' CSV Header;

COPY characteristic_reviews(id, characteristic_id, review_id, value) FROM '/Users/johnong/galvanize/imperial-sdc/reviewsCSV/characteristic_reviews.csv' DELIMITER ',' CSV Header;

COPY reviews_photos(id, review_id, url) FROM '/Users/johnong/galvanize/imperial-sdc/reviewsCSV/reviews_photos.csv' DELIMITER ',' CSV Header;

