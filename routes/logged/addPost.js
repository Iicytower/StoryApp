const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");

const postsController = require("../../controllers/posts");
const { check, body } = require("express-validator");
const validator = require("../../middlewares/validator");

const availableLanguages = ["pl", "en", "ru"];
// TODO add object schema validation "category" value

router.get(
  "/",
  bodyParser.json(),
  [
    check("title").isString().withMessage("Title must be a string"),
    check("description").isString().withMessage("Description must be a string"),
    check("language")
      .isString()
      .isIn(availableLanguages)
      .withMessage(`available languages are ${availableLanguages}`),
    check("public")
      .isBoolean()
      .withMessage(
        "I need information, is it should be public or not. Only boolean value"
      ),
    check("category")
      .custom(
        (category) =>
          typeof category.fantasy === "boolean" &&
          typeof category.romantic === "boolean" &&
          typeof category.drama === "boolean" &&
          typeof category.novel === "boolean"
      )

      .withMessage("category validation error with type"),
  ],
  validator(),
  postsController.add
);
module.exports = router;
