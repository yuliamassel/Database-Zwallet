const connection = require('../configurasi/connectDB');

// POST
const createDeal = (data, dataWalletSender, dataWalletReceiver) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO transaction SET ?', data, (error, result) => {
      if (!error) {
        connection.query('UPDATE wallet SET ?  WHERE user_id = ?', [dataWalletSender, data.source_id], (error, result) => {
          if (!error) {
            connection.query('UPDATE wallet SET ? WHERE user_id = ?', [dataWalletReceiver, data.destination_id], (error, result) => {
              if (!error) {
                resolve(result);
              } else {
                reject(error);
              }
            });
          } else {
            reject(error);
          }
        });
      } else {
        reject(error);
      }
    });
  });
};
// GET
const findDeal = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM transaction', (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

// PUT
const updateDeal = (data, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE transaction SET ? WHERE id=?',
      [data, id],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users INNER JOIN wallet ON users.id = wallet.user_id WHERE users.email = ?', email, (error, result) => {
      if (!error) {
        resolve(result[0]);
      } else {
        reject(error);
      }
    });
  });
};

// DELETE
const deleteDeal = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM transaction WHERE id=?', id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

// GET DETAIL
const detailDeal = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM transaction WHERE id=?', id, (error, result) => {
      if (!error) {
        resolve(result[0]);
      } else {
        reject(error);
      }
    });
  });
};
// `SELECT transactions.id, transactions.user_id, users.email, users.phone, wallets.balance as balance_left, transactions.receiver_name, transactions.receiver_phone, transactions.receiver_picture, transactions.amount_transfer, transactions.notes, transactions.date, transactions.status FROM transactions INNER JOIN users ON transactions.user_id = users.id INNER JOIN wallets ON wallets.user_id = users.id WHERE transactions.user_id
const history = ({ userId, sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT transaction.id, transaction.source_id, users.username, users.telephone, transaction.destination_id, transaction.amount, transaction.notes, transaction.create_at as date FROM transaction INNER JOIN users ON transaction.source_id = users.id ? ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
      [userId, sort, limit, offset],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const getTransactionByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT COUNT(*) AS total FROM transaction WHERE user_id = ?',
      userId,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};
module.exports = {
  createDeal,
  findDeal,
  updateDeal,
  deleteDeal,
  detailDeal,
  getUserByEmail,
  history,
  getTransactionByUserId
};
