const Router = require("express");
const router = Router();
const auth = require('../middlewares/auth');

router.use('/user', require('./user'));
router.use('/logged', auth.isLogin, require('./logged/index'));
router.get('/', (req, res) => res.end('Hello World!'));

module.exports = router;