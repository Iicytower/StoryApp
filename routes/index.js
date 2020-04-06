const Router = require("express");
const router = Router();
const auth = require('../middlewares/auth');

router.use('/user', require('./user'));
router.use('/logged',auth.isLogin, require('./logged/addPost'));

module.exports = router;