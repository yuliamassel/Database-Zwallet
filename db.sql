CREATE DATABASE task_week12;
CREATE TABLE users (
  id VARCHAR(64),
  username VARCHAR (64) NOT NULL,
  email VARCHAR (64) NOT NULL,
  password VARCHAR (64) NOT NULL,
  addres VARCHAR (128),
  telephone VARCHAR (64),
  create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP,
  PRIMARY KEY (id)
);
SELECT
  *
FROM
  users
WHERE
  username LIKE '%ma%';
ALTER TABLE
  wallet
ADD
  FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;
CREATE TABLE wallet (
    id INT AUTO_INCREMENT,
    name VARCHAR (64) NOT NULL,
    user_id VARCHAR(128),
    ballance INT,
    PRIMARY KEY (id)
  );
CREATE TABLE transaction (
    id INT AUTO_INCREMENT,
    source_id VARCHAR(128),
    destination_id VARCHAR(128),
    amount INT,
    balance_left INT,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    PRIMARY KEY (id)
  );
SELECT
  *
FROM
  transaction
ORDER BY
  create_at desc;