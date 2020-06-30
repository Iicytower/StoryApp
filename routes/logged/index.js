const Router = require("express");
const router = Router();
const addPostRouter = require("./addPost");
const removePostRouter = require("./removePost");
const logoutRouter = require("./logout");

router.use('/addPost', addPostRouter);
router.use('/removePost', removePostRouter);
router.use('/logout', logoutRouter);
router.use('/searchEngine', require('./searchEngine'));

module.exports = router;
