const { body } = require("express-validator");
const db = require("../db/queries/queries.js");

const signupValidator = [
  body("firstname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("'Please fill in this field'"),
  body("lastname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("'Please fill in this field'"),
  body("username")
    .trim()
    .custom(async (value) => {
      const user = await db.getUser(value);
      if (user) {
        throw new Error("'Username already taken'");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("'Password must be 8 characters long'")
    .custom((value) => {
      if (!/\d/.test(value)) {
        throw new Error("'Password must contain a number'");
      }
      return true;
    })
    .custom((value) => {
      if (!/[A-Z]/.test(value)) {
        throw new Error(
          "'Password must contain at least one uppercase letter'"
        );
      }
      return true;
    }),
  body("confirm_password")
    .trim()
    .custom(async (value, { req }) => {
      if (req.body.password !== value) {
        throw new Error("'Passwords don't match'");
      }
      return true;
    }),
];

module.exports = signupValidator;
