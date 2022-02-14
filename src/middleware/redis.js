const client = require('../configurasi/redis');

const chaceUsers = async (req, res, next) => {
  const id = req.params.id;
  const users = await client.get(`users/${id}`);
  if (users !== null) {
    res.json({
      status: 'Succes',
      code: 200,
      data: JSON.parse(users),
      messages: 'data from redis'
    });
  } else {
    next();
  };
};

module.exports = {
  chaceUsers
};
