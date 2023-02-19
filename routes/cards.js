const router = require('express').Router();
const Card = require('../models/card');

router.get('/', (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.post('/', (req, res) => {
  const { name, link, owner } = req.body;

  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

// module.exports.createCard = (req, res) => {
//   console.log(req.user._id); // _id станет доступен
// };


module.exports = router;