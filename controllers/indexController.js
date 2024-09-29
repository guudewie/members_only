const asyncHandler = require("express-async-handler");
const db = require("../db/queries/queries.js");
const { body, validationResult } = require("express-validator");

const getSignupForm = asyncHandler(async (req, res, next) => {
  res.render("partials/signup");
});

module.exports = {
  getSignupForm,
};
