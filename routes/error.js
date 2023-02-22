const router = require('express').Router();
const { error } = require('../controllers/error');

router.get('/*', error);

module.exports = router;