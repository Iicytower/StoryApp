const Router = require("express");
const router = Router();
const addPostRouter = require("./addPost");
const removePostRouter = require("./removePost");
const showPostsRouter = require("./showPosts");
const logoutRouter = require("./logout");

router.use('/addPost', addPostRouter);
router.use('/removePost', removePostRouter);
router.use('/showPost', showPostsRouter);
router.use('/logout', logoutRouter);

module.exports = router;
