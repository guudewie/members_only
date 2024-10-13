const { body } = require("express-validator");

const messageValidator = [
  body("message")
    .trim()
    .isLength({ min: 1 })
    .withMessage("'Cannot send empty message'"),
];

module.exports = messageValidator;
