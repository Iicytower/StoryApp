const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const { logout } = require('../../controllers/users');

router.post('/',
    bodyParser.json(),
    logout);

module.exports = router;
