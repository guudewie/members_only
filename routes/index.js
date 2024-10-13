const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");

/*** HOME ***/

// GET / - Display messages
router.get("/", controller.getMainPage);

/*** LOGIN ***/

// GET /login - Render login form
router.get("/login", controller.getLoginForm);

// POST /login - Process login
router.post("/login", controller.login);

/*** SIGNUP ***/

// GET /signup - Render signup form
router.get("/signup", controller.getSignupForm);

// POST /signup - Process login
router.post("/signup", controller.signup);

/*** WRITE MESSAGE ***/

// POST /message - Process message form
router.post("/message", controller.writeMessage);

// POST /message/delete/:id - Process message form
router.get("/message/delete/:id", controller.deleteMessage);

/*** LOGOUT ***/

// POST /logout - Log user out
router.get("/logout", controller.logout);

/*** MEMBERSHIP ***/

// POST /membership - Process membership application
router.post("/member", controller.becomeMember);

module.exports = router;
