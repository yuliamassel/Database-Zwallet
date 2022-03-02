const connection = require('../configurasi/connectDB');

// POST
const createDeal = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO transaction SET ?', data, (error, result) => {
      if (!error) {
        connection.query('UPDATE wallet SET ballance = ballance - ?  WHERE user_id = ?', [data.amount, data.source_id], (error, result) => {
          if (!error) {
            connection.query('UPDATE wallet SET ballance = ballance + ? WHERE user_id = ?', [data.amount, data.destination_id], (error, result) => {
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

const history = ({ userId, sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT transaction.id, transaction.source_id, users.email, users.telephone, balance_left, transaction.receiver_name, transaction.receiver_telephone, transaction.receiver_photo, transaction.amount, transaction.notes, transaction.date, transaction.status FROM transaction INNER JOIN users ON transaction.source_id = users.id INNER JOIN wallet ON wallet.user_id = users.id WHERE transaction.source_id = ? ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
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
