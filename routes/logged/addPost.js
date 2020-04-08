const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const postsController = require('../../controllers/posts');
const { check } = require("express-validator");
const validator = require("../../middlewares/validator");

router.get('/',
    bodyParser.json(),
    [
        check('title').isString(),
        check('description').isString(),
    ],
    validator(),
    postsController.add);

module.exports = router;
