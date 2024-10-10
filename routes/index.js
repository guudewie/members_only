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
//router.post("/login", controller.login);

/*** SIGNUP ***/

// GET /signup - Render signup form
router.get("/signup", controller.getSignupForm);

// POST /signup - Process login
router.post("/signup", controller.signup);

/*** WRITE MESSAGE ***/

// GET /message - Render create message form
router.get("/message", (req, res) => res.send("Not implemented yet"));

// POST /message - Process message form
router.post("/message", (req, res) => res.send("Not implemented yet"));

/*** LOGOUT ***/

// POST /logout - Log user out
router.post("/logout", (req, res) => res.send("Not implemented yet"));

/*** MEMBERSHIP ***/

// GET /membership - Get form to get memberships
router.post("/membership", (req, res) => res.send("Not implemented yet"));

// POST /membership - Process membership application
router.post("/membership", (req, res) => res.send("Not implemented yet"));

module.exports = router;
