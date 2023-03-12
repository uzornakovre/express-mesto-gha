const Card = require('../models/card');
const {
  OK,
  CREATED,
  INVALID_DATA,
  NOT_FOUND,
  FORBIDDEN,
} = require('../utils/resStatus');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(OK.CODE).send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(CREATED.CODE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA.CODE).send(INVALID_DATA.RESPONSE);
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      const cardOwner = String(card.owner);
      if (cardOwner === req.user._id) {
        Card.deleteOne({ cardId })
          .then(() => {
            res.status(OK.CODE).send(OK.DEL_CARD_RESPONSE);
          })
          .catch((err) => next(err));
      } else if (card) {
        res.status(FORBIDDEN.CODE).send(FORBIDDEN.RESPONSE);
      } else {
        res.status(NOT_FOUND.CODE).send(NOT_FOUND.CARD_RESPONSE);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA.CODE).send(INVALID_DATA.RESPONSE);
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
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
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(OK.CODE).send(OK.DISLIKE_CARD_RESPONSE);
      } else {
        res.status(NOT_FOUND.CODE).send(NOT_FOUND.CARD_RESPONSE);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA.CODE).send(INVALID_DATA.RESPONSE);
      } else {
        next(err);
      }
    });
};
