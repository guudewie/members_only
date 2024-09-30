const asyncHandler = require("express-async-handler");
const db = require("../db/queries/queries.js");
const { body, validationResult } = require("express-validator");

const getMainPage = asyncHandler(async (req, res, next) => {
  res.render("partials/main");
});

const getSignupForm = asyncHandler(async (req, res, next) => {
  res.render("partials/signup");
});

const getLoginForm = asyncHandler(async (req, res, next) => {
  res.render("partials/login");
});

module.exports = {
  getSignupForm,
  getLoginForm,
  getMainPage,
};
