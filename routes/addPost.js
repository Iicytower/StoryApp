const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const auth = require('../middlewares/auth');
const postsController = require('../controllers/posts');

router.get('/', bodyParser.json(), auth.isLogin, postsController.add);

module.exports = router;
