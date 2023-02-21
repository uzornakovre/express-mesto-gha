const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(card => res.status(201).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.deleteCard = (req, res) => {
  Card.deleteOne({ _id: req.params.cardId })
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}