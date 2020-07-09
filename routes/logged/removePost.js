const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const postsController = require('../../controllers/posts');
const { check } = require("express-validator");
const validator = require("../../middlewares/validator");

router.delete('/',
    bodyParser.json(),
    [
        check('postsId').isArray().withMessage('wrong dataType, we need array'),
    ],
    validator(),
    postsController.remove);

module.exports = router;
