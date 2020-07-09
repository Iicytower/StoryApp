const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { login, register } = require("../controllers/users");
const { check } = require("express-validator");
const validator = require("../middlewares/validator");

//password must contain small and big letter, digit and special character. available characters: ! @ # $ % ^ & * ( )
const regexpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[\!\@\#\$\%\^\&\*\(\)])(?=.*[A-Z])(?!.*\s).{8,}$/g;

router.post(
  "/login",
  bodyParser.json(),
  [
    check("nickname").isString(),
    check("password").isString().isLength({ min: 8, max: 36 }), //.matches(regexpPassword),
  ],
  validator(),
  login
);

router.post(
  "/register",
  bodyParser.json(),
  [
    check("email").isEmail(),
    check("name").isString(),
    check("nickname").isString(),
    check("password")
      .isString()
      .isLength({ min: 8, max: 36 })
      .matches(regexpPassword)
      .withMessage(
        "Password must contain small and big letter, digit and special character. available characters: ! @ # $ % ^ & * ( )"
      ),
  ],
  validator(),
  register
);

module.exports = router;
