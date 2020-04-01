const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const usersController = require('../../controllers/users');

router.post('/', bodyParser.json(), usersController.register);

module.exports = router;