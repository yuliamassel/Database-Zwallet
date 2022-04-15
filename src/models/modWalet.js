const connection = require('../configurasi/connectDB');
// POST
const createData = (dataWallet) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO wallet set ?', dataWallet, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

// GET
const findData = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM wallet', (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

// PUT
const updateData = (dataWallet, walletId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE wallet SET ? WHERE id=?',
      [dataWallet, walletId],
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

// DELETE
const deleteData = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM wallet WHERE id=?', id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

// GET DETAIL
const detailData = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM wallet WHERE id=?', id, (error, result) => {
      if (!error) {
        resolve(result[0]);
      } else {
        reject(error);
      }
    });
  });
};

const BalanceWallet = (idUser) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM wallet WHERE user_id = ?', idUser, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        console.log(error);
        reject(error);
      }
    });
  });
};

const searchWallet = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT wallet.user_id, wallet.id, users.email, users.telephone, wallet.balance, wallet.income, wallet.expense, wallet.created_at, wallet.updated_at FROM wallet INNER JOIN users ON wallet.user_id = users.id WHERE wallet.user_id = ?',
      [userId],
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
  createData,
  findData,
  updateData,
  deleteData,
  detailData,
  BalanceWallet,
  searchWallet
};
