const handleUrl = (req, res, next) => {
  res.status(404);
  res.json({
    message: 'url not found'
  });
};

const response = (res, result, status, pagination, message) => {
  res.status(status).json({
    status: 'Succes',
    code: status,
    data: result,
    pagination: pagination,
    message: message || ''
  });
};

module.exports = {
  handleUrl,
  response
};
