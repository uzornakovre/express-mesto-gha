const { NOT_FOUND } = require('../utils/resStatus');

module.exports.error = (req, res) => {
  res.status(NOT_FOUND.CODE).send(NOT_FOUND.PAGE_RESPONSE);
};
