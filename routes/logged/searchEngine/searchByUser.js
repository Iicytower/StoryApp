const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");

const searchPostsController = require("../../../controllers/searchEngine/searchByUser");
const { check } = require("express-validator");
const validator = require("../../../middlewares/validator");

router.get(
  "/findUser",
  bodyParser.json(),
  [
    check('owner').isString(),
  ],
  validator(),
  searchPostsController.userSearcher
);
router.get(
  "/userPost",
  bodyParser.json(),
  [
    check("userId").isInt(),
  ],
  searchPostsController.userPostSearcher
  );

module.exports = router;
