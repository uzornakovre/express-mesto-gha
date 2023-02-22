const router = require('express').Router();
const { error } = require('../controllers/error');

router.get('/*', error);
router.post('/*', error);
router.put('/*', error);
router.patch('/*', error);
router.delete('/*', error);

module.exports = router;
