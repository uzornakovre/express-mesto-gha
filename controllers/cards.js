const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then(card => res.status(201).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.status(200).send({ message: 'Лайк добавлен' }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.status(200).send({ message: 'Лайк удален' }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}