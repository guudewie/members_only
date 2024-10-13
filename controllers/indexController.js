const asyncHandler = require("express-async-handler");
const db = require("../db/queries/queries.js");
const { validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const signupValidator = require("../validators/signup.js");
const messageValidator = require("../validators/message.js");

const getMainPage = asyncHandler(async (req, res, next) => {
  const messages = await db.getMessages();
  res.render("partials/main", { errors: [], messages: messages });
});

const getSignupForm = asyncHandler(async (req, res, next) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("partials/signup", {
    errors: [],
    formData: [],
  });
});

const signup = [
  signupValidator,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("partials/signup", {
        formData: req.body,
        errors: errors.mapped(),
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) next(err);

        await db.createUser(
          req.body.firstname,
          req.body.lastname,
          req.body.username,
          hashedPassword,
          "normal"
        );

        res.redirect("/login");
      });
    }
  }),
];

const getLoginForm = asyncHandler(async (req, res, next) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("partials/login");
});

const login = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/",
});

const logout = asyncHandler((req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

const writeMessage = [
  messageValidator,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const messages = await db.getMessages();

    if (!errors.isEmpty()) {
      return res.render("partials/main", {
        errors: errors.mapped(),
        messages: messages,
      });
    } else {
      await db.createMessage(req.user.id, req.body.message);
    }

    res.redirect("/");
  }),
];

const becomeMember = asyncHandler(async (req, res, next) => {
  console.log(req.body.password);
  console.log(process.env.MEMBER_PW);
  if (req.body.password !== process.env.MEMBER_PW) {
    return res.redirect("/");
  }

  await db.updateUserStatus(req.user.id, "member");
  return res.redirect("/");
});

module.exports = {
  getSignupForm,
  getLoginForm,
  getMainPage,
  signup,
  login,
  logout,
  writeMessage,
  becomeMember,
};
