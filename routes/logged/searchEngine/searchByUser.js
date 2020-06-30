const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const searchPostsController = require('../../controllers/searchEngine/searchByUser');
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
    (req,res)=> res.end('dupa'));
    // searchPostsController.userSearcher);

module.exports = router;
