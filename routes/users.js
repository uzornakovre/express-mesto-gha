const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.use(auth);
router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
