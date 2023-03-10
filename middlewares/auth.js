const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { UNAUTHORIZED } = require('../utils/resStatus');

function handleAuthError(res) {
  return res.status(UNAUTHORIZED.CODE).send(UNAUTHORIZED.RESPONSE);
}

function extractBearerToken(header) {
  return header.replace('Bearer ', '');
}

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }
  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
