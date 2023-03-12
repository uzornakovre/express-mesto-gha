const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlValid } = require('../utils/validationRules');
const { createUser } = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlValid),
  }),
}), createUser);

module.exports = router;
