-- DROP DATABASE IF EXISTS qanda;

-- CREATE DATABASE IF NOT EXISTS qanda;

-- USE DATABASE qanda;

CREATE TABLE products(
  product_id INT NOT NULL PRIMARY KEY,
  product_name VARCHAR(30) NOT NULL,
  slogan VARCHAR(300),
  description VARCHAR(500),
  category VARCHAR(20),
  default_price INT
);

CREATE TABLE questions(
  question_id INT NOT NULL,
  product_id INT NOT NULL,
  question_body TEXT NOT NULL,
  question_date VARCHAR(20),
  asker_name VARCHAR(50),
  asker_email VARCHAR(50),
  reported INT,
  question_helpfulness INT,
  PRIMARY KEY(question_id),
  FOREIGN KEY(product_id) references products(product_id)
);


CREATE TABLE answers(
  answer_id INT NOT NULL PRIMARY KEY,
  question_id INT NOT NULL,
  body TEXT,
  date VARCHAR(20),
  answerer_name VARCHAR(50),
  answerer_email VARCHAR(50),
  reported INT,
  helpfulness INT,
  FOREIGN KEY(question_id) references questions(question_id)
);

CREATE TABLE answer_photos(
  url VARCHAR(300),
  answer_photos_id INT NOT NULL,
  answer_id INT NOT NULL,
  FOREIGN KEY(answer_id) references answers(answer_id)
);

-- [{
--         "question_id": 37,
--         "question_body": "Why is this product cheaper here than other sites?",
--         "question_date": "2018-10-18T00:00:00.000Z",
--         "asker_name": "williamsmith",
--         "question_helpfulness": 4,
--         "reported": false,
--         "answers": {
--           68: {
--             "id": 68,
--             "body": "We are selling it here without any markup from the middleman!",
--             "date": "2018-08-18T00:00:00.000Z",
--             "answerer_name": "Seller",
--             "helpfulness": 4,
--             "photos": []
--             // ...
--           }
--         }
--       }