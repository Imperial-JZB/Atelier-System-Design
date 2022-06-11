-- DROP DATABASE IF EXISTS qanda WITH (FORCE);

-- CREATE DATABASE qanda;

\c

DROP TABLE IF EXISTS products, questions, answers, answer_photos;

CREATE TABLE products(
  product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(30) NOT NULL,
  slogan VARCHAR(300),
  description VARCHAR(500),
  category VARCHAR(20),
  default_price INT
);

CREATE TABLE questions(
  question_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  question_body TEXT NOT NULL,
  question_date VARCHAR(20),
  asker_name VARCHAR(50),
  asker_email VARCHAR(50),
  reported INT DEFAULT 0,
  question_helpfulness INT DEFAULT 0,
  FOREIGN KEY(product_id) references products(product_id)
);


CREATE TABLE answers(
  answer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,
  body TEXT,
  date VARCHAR(20),
  answerer_name VARCHAR(50),
  answerer_email VARCHAR(50),
  reported INT DEFAULT 0,
  helpfulness INT DEFAULT 0,
  FOREIGN KEY(question_id) references questions(question_id)
);

CREATE TABLE answer_photos(
  answer_photos_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(300),
  answer_id INT NOT NULL,
  FOREIGN KEY(answer_id) references answers(answer_id)
);


-- COPY products(product_id, product_name, slogan, description, category, default_price) FROM '/Users/brianbui/Desktop/HR Sprints/SDC/data/product.csv' DELIMITER ',' CSV header;

-- COPY questions(question_id, product_id , question_body, question_date, asker_name, asker_email, reported, question_helpfulness) FROM '/Users/brianbui/Desktop/HR Sprints/SDC/data/questions.csv' DELIMITER ',' CSV header;

-- COPY answers(answer_id, question_id , body, date, answerer_name, answerer_email, reported, helpfulness) FROM '/Users/brianbui/Desktop/HR Sprints/SDC/data/answers.csv' DELIMITER ',' CSV header;

-- COPY answer_photos(answer_photos_id, answer_id, url) FROM '/Users/brianbui/Desktop/HR Sprints/SDC/data/answers_photos.csv' DELIMITER ',' CSV header;