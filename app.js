const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const path = require("node:path");

const indexRouter = require("./routes/index");

require("dotenv").config();

// set upt view engine ejs
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// authentication
require("./config/passport/passport");
app.use;

app.use("/", indexRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`Running... listening on Port ${PORT}`));
