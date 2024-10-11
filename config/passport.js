const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const Pool = require("../db/pool");
const db = require("../db/queries/queries");
const bcrypt = require("bcryptjs");

const verifyCallback = async (username, password, done) => {
  try {
    const user = db.getUser(username);

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.passport);

    if (match) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect password" });
    }
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(() => {});

passport.use(strategy);
