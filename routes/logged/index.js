const Router = require("express");
const router = Router();

router.use('/addPost', require("./addPost"));
router.use('/removePost', require("./removePost"));
router.use('/logout', require("./logout"));
router.use('/searchEngine', require('./searchEngine'));

module.exports = router;
