CREATE DATABASE task_week12;
CREATE TABLE users (
  id VARCHAR(128),
  username VARCHAR (64) NOT NULL,
  email VARCHAR (64) NOT NULL,
  password VARCHAR (64) NOT NULL,
  addres VARCHAR (128),
  telephone VARCHAR (64),
  photo VARCHAR(128),
  role VARCHAR(32) DEFAULT 'user',
  verify VARCHAR(16),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME,
  PRIMARY KEY (id)
);
+ -----------+--------------+------+-----+-------------------+-------------------+
| id | varchar(128) | NO | PRI | NULL | | | username | varchar(64) | NO | | NULL | | | email | varchar(64) | NO | | NULL | | | password | varchar(64) | NO | | NULL | | | addres | varchar(128) | YES | | NULL | | | telephone | varchar(64) | YES | | NULL | | | photo | varchar(128) | YES | | NULL | | | role | varchar(32) | YES | | NULL | | | verify | varchar(16) | YES | | NULL | | | create_at | timestamp | NO | | CURRENT_TIMESTAMP | DEFAULT_GENERATED | | updated | timestamp | YES | | NULL |
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
    id VARCHAR(128) NOT NULL,
    user_id VARCHAR(128) NOT NULL,
    name VARCHAR (64) NOT NULL,
    balance INT DEFAULT 0,
    income INT DEFAULT 0,
    expense INT DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    PRIMARY KEY (id),
    CONSTRAINT fk_wallet_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
  );
| id | varchar(128) | NO | PRI | NULL | | | name | varchar(64) | NO | | NULL | | | user_id | varchar(128) | YES | MUL | NULL | | | balance | int | NO | | 0 | | | income | int | NO | | 0 | | | expense | int | NO | | 0 | | | created_at | timestamp | NO | | CURRENT_TIMESTAMP | DEFAULT_GENERATED | | updateAt | datetime | YES | | NULL | CREATE TABLE transaction (
    id INT AUTO_INCREMENT,
    source_id VARCHAR(128),
    destination_id VARCHAR(128),
    amount INT DEFAULT 0,
    balance_left INT,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    PRIMARY KEY (id),
    CONSTRAINT fk_transaction_user FOREIGN KEY (source_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
  );
| id | int | NO | PRI | NULL | auto_increment | | source_id | varchar(128) | YES | | NULL | | | destination_id | varchar(128) | YES | | NULL | | | amount | int | YES | | NULL | | | balance_left | int | YES | | NULL | | | create_at | timestamp | NO | | CURRENT_TIMESTAMP | DEFAULT_GENERATED | | notes | text | YES | | NULL |
SELECT
  *
FROM
  transaction
ORDER BY
  create_at desc;
CREATE TABLE transaction_history (
    id INT,
    transactionId INT,
    userId INT,
    receiverName VARCHAR(128),
    receiverPhone VARCHAR (64),
    receiverPicture VARCHAR(128),
    notes TEXT,
    amount INT,
    status VARCHAR(64) PRIMARY KEY (id)
  );
CREATE TABLE topups (
    id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    wallet_id VARCHAR(64) NOT NULL,
    amount_topup INT NOT NULL DEFAULT 0,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    PRIMARY KEY (id),
    CONSTRAINT fk_topup_user_wallet FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (wallet_id) REFERENCES wallet (id) ON DELETE CASCADE ON UPDATE CASCADE
  );
transactionId,
  userId,
  receiverName,
  receiverPhone,
  receriverPicture,
  notes,
  date,
  status,
  updatedAt
ALTER TABLE
  wallet
ADD
  COLUMN income INT NOT NULL default 0
AFTER
  balance;
ALTER TABLE
  wallet
ADD
  COLUMN expense INT NOT NULL default 0
AFTER
  income;
ALTER TABLE
  wallet RENAME COLUMN ballance TO balance;
ALTER TABLE
  wallet
MODIFY
  balance INT NOT NULL default 0;
ALTER TABLE
  topup
MODIFY
  amount_topup INT default 0;
ALTER TABLE
  wallet
ADD
  COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE
  wallet
ADD
  COLUMN updateAt DATETIME;
ALTER TABLE
  wallet
MODIFY
  id VARCHAR(128) NOT NULL;
ALTER TABLE
  transaction
ADD
  FOREIGN KEY(source_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE
  transaction
ADD
  CONSTRAINT transaction_user_fk FOREIGN KEY(source_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE
  topups RENAME TO topup;