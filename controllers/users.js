const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  OK,
  CREATED,
  INVALID_DATA,
  NOT_FOUND,
  CONFLICT,
  INTERNAL,
} = require('../utils/resStatus');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK.CODE).send({ data: users }))
    .catch(() => res.status(INTERNAL.CODE).send(INTERNAL.RESPONSE));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(OK.CODE).send({ data: user });
      } else {
        res.status(NOT_FOUND.CODE).send(NOT_FOUND.USER_RESPONSE);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA.CODE).send(INVALID_DATA.RESPONSE);
      } else {
        res.status(INTERNAL.CODE).send(INTERNAL.RESPONSE);
      }
    });
};

module.exports.createUser = (req, res) => {
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
        res.status(INTERNAL.CODE).send(INTERNAL.RESPONSE);
      }
    });
};

module.exports.updateUserInfo = (req, res) => {
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
        res.status(INTERNAL.CODE).send(INTERNAL.RESPONSE);
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
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
        res.status(INTERNAL.CODE).send(INTERNAL.RESPONSE);
      }
    });
};
