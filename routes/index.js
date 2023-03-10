const router = require('express').Router();
const auth = require('../middlewares/auth');

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));
router.use('/', require('./error'));

module.exports = router;
