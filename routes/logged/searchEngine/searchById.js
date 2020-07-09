const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const searchPostsController = require('../../../controllers/searchEngine/searchById');
const { check } = require("express-validator");
const validator = require("../../../middlewares/validator");

router.get('/',
    bodyParser.json(),
    [
        check('postsId').isArray().withMessage('wrong dataType'),
    ],
    validator(),
    searchPostsController.idSearcher);

module.exports = router;
