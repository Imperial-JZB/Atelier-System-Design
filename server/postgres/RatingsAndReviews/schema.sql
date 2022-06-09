DROP DATABASE IF EXISTS ratings_review WITH (FORCE);

CREATE DATABASE ratings_review;

\c ratings_review

DROP TABLE IF EXISTS characteristic_reviews, characteristics, reviews_photos, reviews;

-- use more file
-- id,characteristic_id,review_id,value
CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id INTEGER UNIQUE PRIMARY KEY NOT NULL,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL
);

-- id,product_id,name
CREATE TABLE IF NOT EXISTS characteristics (
  id INTEGER UNIQUE PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL,
  name VARCHAR(225) NOT NULL
);

--id,review_id,url
CREATE TABLE IF NOT EXISTS reviews_photos (
  id INTEGER UNIQUE PRIMARY KEY NOT NULL,
  review_id INTEGER NOT NULL,
  url VARCHAR(225) NOT NULL
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

COPY characteristic_reviews FROM '/Users/johnong/galvanize/imperial-sdc/reviewsCSV/characteristic_reviews.csv' DELIMITER ',' CSV Header;

COPY characteristics FROM '/Users/johnong/galvanize/imperial-sdc/reviewsCSV/characteristics.csv' DELIMITER ',' CSV Header;

COPY reviews_photos FROM '/Users/johnong/galvanize/imperial-sdc/reviewsCSV/reviews_photos.csv' DELIMITER ',' CSV Header;

COPY reviews FROM '/Users/johnong/galvanize/imperial-sdc/reviewsCSV/reviews.csv' DELIMITER ',' CSV Header;
