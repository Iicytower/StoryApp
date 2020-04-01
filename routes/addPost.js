const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const postsController = require('../controllers/posts');

router.get('/', bodyParser.json(), postsController.add);

module.exports = router;