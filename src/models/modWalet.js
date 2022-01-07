const connection = require('../configurasi/connectDB');
// POST
const createData = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO wallet set ?', data, (error, result) => {
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
const updateData = (data, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE wallet SET ? WHERE id=?',
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

module.exports = {
  createData,
  findData,
  updateData,
  deleteData,
  detailData
};
