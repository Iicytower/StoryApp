const Router = require("express");
const router = Router();

router.use('/user', require('./user'));
router.use('/addPost', require('./addPost'));

module.exports = router;