const asyncHandler = require("express-async-handler");
const db = require("../db/queries/queries.js");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const getMainPage = asyncHandler(async (req, res, next) => {
  res.render("partials/main");
});

const getSignupForm = asyncHandler(async (req, res, next) => {
  res.render("partials/signup");
});

const signup = [
  body("firstname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please fill in this field"),
  body("lastname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please fill in this field"),
  body("username")
    .trim()
    .custom(async (value) => {
      const user = db.getUser(req.body.username);
      if (user) {
        throw new Error("Username not unique");
      }
    })
    .withMessage("Username already taken"),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please fill in this field"),
  body("confirm_password")
    .trim()
    .custom(async (value) => {
      if (req.body.password !== req.body.confirm_password) {
        throw new Error("Passwords don't match");
      }
    })
    .withMessage("Passwords don't match"),
  asyncHandler(async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) next(err);

      await db.createUser(
        req.body.firstname,
        req.body.lastname,
        req.body.username,
        hashedPassword,
        "normal"
      );

      res.redirect("/");
    });
  }),
];

const getLoginForm = asyncHandler(async (req, res, next) => {
  res.render("partials/login");
});

const login = [
  passport.authenticate("login"),
  asyncHandler(async (req, res, next) => {
    res.render("partials/login");
  }),
];

module.exports = {
  getSignupForm,
  getLoginForm,
  getMainPage,
  signup,
};
