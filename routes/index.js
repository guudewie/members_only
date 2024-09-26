const express = require("express");
const router = express.Router();

/*** HOME ***/

// GET / - Display messages
router.get("/" /* controller.method */);

/*** LOGIN ***/

// GET /login - Render login form
router.get("/login" /* controller.method */);

// POST /login - Process login
router.post("/login" /* controller.method */);

/*** SIGNUP ***/

// GET /signup - Render signup form
router.get("/signup" /* controller.method */);

// POST /signup - Process login
router.post("/signup" /* controller.method */);

/*** WRITE MESSAGE ***/

// GET /message - Render create message form
router.get("/message" /* controller.method */);

// POST /message - Process message form
router.post("/message" /* controller.method */);

/*** LOGOUT ***/

// POST /logout - Log user out
router.post("/logout" /* controller.method */);

/*** MEMBERSHIP ***/

// GET /membership - Get form to get memberships
router.post("/membership" /* controller.method */);

// POST /membership - Process membership application
router.post("/membership" /* controller.method */);
