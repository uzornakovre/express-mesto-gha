const Card = require('../models/card');
const {
  OK,
  CREATED,
  INVALID_DATA,
  NOT_FOUND,
  INTERNAL,
} = require('../utils/resStatus');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(OK.CODE).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(CREATED.CODE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA.CODE).send(INVALID_DATA.RESPONSE);
      } else {
        res.status(INTERNAL.CODE).send(INTERNAL.RESPONSE);
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.status(OK.CODE).send(OK.DEL_CARD_RESPONSE);
      } else {
        res.status(NOT_FOUND.CODE).send(NOT_FOUND.CARD_RESPONSE);
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

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(OK.CODE).send(OK.LIKE_CARD_RESPONSE);
      } else {
        res.status(NOT_FOUND.CODE).send(NOT_FOUND.CARD_RESPONSE);
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

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(OK.DISLIKE_CARD_RESPONSE);
      } else {
        res.status(NOT_FOUND.CODE).send(NOT_FOUND.CARD_RESPONSE);
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
