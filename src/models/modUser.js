const connection = require('../configurasi/connectDB');

// USE QUERY PARAMS
const getUsers = ({ search, sort, updated, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM users WHERE username LIKE '%${search}%' ORDER BY ${sort} ${updated} LIMIT ? OFFSET ? `, [limit, offset], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const findData = (email) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line quotes
    connection.query(`SELECT * FROM users WHERE email = ?`, email, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const insertData = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users SET ?', data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const postUsers = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users set ?', data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const updateUsers = (data, email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE users SET ? WHERE email=?',
      [data, email],
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

const updatePhoto = (data, email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE users SET ? WHERE email=?',
      [data, email],
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

// const delPhoneNumber = (data, email) => {
//   return new Promise((resolve, reject) => {
//     connection.query('DELETE FROM users WHERE email=?', [data, email], (error, result) => {
//       if (!error) {
//         resolve(result);
//       } else {
//         reject(error);
//       }
//     });
//   });
// };

const deleteUsers = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM users WHERE id=?', id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const detailUsers = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users LEFT JOIN wallet ON users.id = wallet.user_id WHERE users.id = ?', id, (error, result) => {
      if (!error) {
        resolve(result[0]);
      } else {
        reject(error);
      }
    });
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT users.id, users.username, users.email, wallet.balance, wallet.income, wallet.expense, users.telephone, users.photo FROM users INNER JOIN wallet ON users.id = wallet.user_id WHERE users.email = ?', email, (error, result) => {
      if (!error) {
        resolve(result[0]);
      } else {
        reject(error);
      }
    });
  });
};

const usersCount = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT COUNT(*) AS total FROM users', (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = {
  postUsers,
  getUsers,
  updateUsers,
  deleteUsers,
  detailUsers,
  usersCount,
  findData,
  insertData,
  getUserByEmail,
  updatePhoto
};
