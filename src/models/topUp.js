const connection = require('../configurasi/connectDB');

const topUp = (dataTopUp) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO topup SET ?', dataTopUp, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getTopUpRecord = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM topup WHERE id = ?',
      id,
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

const calculateTopUpRecords = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT COUNT(*) AS total FROM topup',
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

const calculateTopUpRecordsByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT COUNT(*) AS total FROM topup WHERE user_id = ?',
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

const topUpHistory = ({ userId, sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
        `SELECT topup.id, users.id, users.username, users.email, users.telephone, users.photo, topup.amount_topup, topup.date, topup.updated_at FROM topup INNER JOIN users ON users.id = topup.user_id WHERE topup.user_id = ? ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
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

const topUpList = ({ sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
        `SELECT topup.id, users.email, users.telephone, topup.user_id, topup.amount_topup, topup.date, wallet.balance, topup.updated_at FROM topup INNER JOIN users ON topup.user_id = users.id INNER JOIN wallet ON wallet.user_id = users.id ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
        [sort, limit, offset],
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
  topUp,
  getTopUpRecord,
  calculateTopUpRecords,
  calculateTopUpRecordsByUserId,
  topUpHistory,
  topUpList
};
