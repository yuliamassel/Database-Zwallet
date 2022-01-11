const connection = require('../configurasi/connectDB');

// POST
const createDeal = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO transaction SET ?', data, (error, result) => {
      if (!error) {
        connection.query('UPDATE wallet SET ballance = ballance - ?  WHERE id = ?', [data.amount, data.source_id], (error, result) => {
          if (!error) {
            connection.query('UPDATE wallet SET ballance = ballance + ? WHERE id = ?', [data.amount, data.destination_id], (error, result) => {
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

module.exports = {
  createDeal,
  findDeal,
  updateDeal,
  deleteDeal,
  detailDeal
};
