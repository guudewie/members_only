const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const Pool = require("../db/pool");

const sessionStore = new pgSession({
  pool: Pool,
  tableName: "session",
});

module.exports = expressSession({
  store: sessionStore,
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3 * 24 * 60 * 60 * 1000 }, // 3 days
});
