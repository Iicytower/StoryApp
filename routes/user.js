const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const usersController = require('../controllers/users');

router.post('/login', bodyParser.json(), usersController.login);
router.post('/register', bodyParser.json(), usersController.register);


module.exports = router;