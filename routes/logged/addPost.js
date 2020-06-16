const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");

const postsController = require("../../controllers/posts");
const { check, checkSchema } = require("express-validator");
const validator = require("../../middlewares/validator");

router.get(
  "/",
  bodyParser.json(),
  [
    check("title").isString(),
    check("description").isString(),
    check("language").isString().isIn(["pl","en","ru"]),
    // TODO add object schema validation "category" value

    // check("category").customSanitizer(category => {
    //     if(
    //         typeof category.fantasy === "boolean" &&
    //         typeof category.romanse === "boolean" &&
    //         typeof category.drama === "boolean" &&
    //         typeof category.novel === "boolean" 
    //     ) return category;
    // }),
  ],
  validator(),
  postsController.add
);
//TODO category czy odpowiada określonemu schematowi obiektu
module.exports = router;
