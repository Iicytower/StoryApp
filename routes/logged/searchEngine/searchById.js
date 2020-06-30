const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const searchPostsController = require('../../controllers/searchEngine/searchById');
const { check } = require("express-validator");
const validator = require("../../../middlewares/validator");

router.get('/',
    bodyParser.json(),
    [
        // check('postId').isInt(),
        // check('ownerId').isBoolean(),
        // check('title').isString(),
        // TODO add object schema validation "category" value
    ],
    validator(),
    searchPostsController.idSearcher);

module.exports = router;
