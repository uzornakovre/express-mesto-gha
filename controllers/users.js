const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  OK,
  CREATED,
  INVALID_DATA,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
} = require('../utils/resStatus');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(OK.CODE).send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(OK.CODE).send({ data: user });
      } else {
        res.status(NOT_FOUND.CODE).send(NOT_FOUND.USER_RESPONSE);
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.status(CREATED.CODE).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA.CODE).send(INVALID_DATA.RESPONSE);
      } else if (err.code === 11000) {
        res.status(CONFLICT.CODE).send(CONFLICT.EMAIL_RESPONSE);
      } else {
        next(err);
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      res.status(OK.CODE).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA.CODE).send(INVALID_DATA.RESPONSE);
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.status(OK.CODE).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA.CODE).send(INVALID_DATA.RESPONSE);
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(OK.CODE).send({ token });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED.CODE).send({ message: err.message });
    });
};
