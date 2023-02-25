const User = require('../models/user');
const {
  OK,
  CREATED,
  INVALID_DATA,
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
        res.status(200).send({ data: user });
      } else {
        res.status(404).send({ message: 'Пользователь с таким именем не найден' });
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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED.CODE).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA.CODE).send(INVALID_DATA.RESPONSE);
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
