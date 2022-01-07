CREATE DATABASE task_week12;

CREATE TABLE users (
    id INT AUTO_INCREMENT,
    username VARCHAR (64) NOT NULL,
    email VARCHAR (64) NOT NULL,
    password VARCHAR (64) NOT NULL,
    addres VARCHAR (128) NOT NULL,
    telephone VARCHAR (64) NOT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP,
    PRIMARY KEY (id)
);

SELECT * FROM users WHERE username LIKE '%ma%';

ALTER TABLE wallet ADD FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE TABLE wallet (
    id INT AUTO_INCREMENT,
    name VARCHAR (64) NOT NULL,
    user_id INT NOT NULL,
    ballance INT ,
    PRIMARY KEY (id)
);

CREATE TABLE transaction (
    id INT AUTO_INCREMENT,
    source_id INT NOT NULL,
    destination_id INT NOT NULL,
    amount INT NOT NULL,
    balance_left INT ,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notes TEXT NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM transaction ORDER BY create_at desc;