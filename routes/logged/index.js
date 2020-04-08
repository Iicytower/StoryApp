const Router = require("express");
const router = Router();
const addPostRouter = require("./addPost");
const logoutRouter = require("./logout");

router.use('/addPost', addPostRouter);
router.use('/logout', logoutRouter);

module.exports = router;
