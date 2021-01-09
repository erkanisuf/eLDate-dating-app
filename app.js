const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const cors = require("cors");
cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

//Passport Imports
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
// --END passport

//Cors,Body parses Imports
//DATABASE Setting for Session
app.use(cors());
app.use(bodyParser.json());
const db = require("./db");
const sessionConfig = {
  store: new pgSession({
    pool: db,
    tableName: "session",
  }),
  name: "mysession",
  secret: "asdfq",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    aameSite: true,
    secure: false, // ENABLE ONLY ON HTTPS
  },
};

app.use(session(sessionConfig));
// SESSION DATABASE

// Import PassportConfig
require("./routes/passportConfig")(app, passport, FacebookStrategy);
const flowersRoute = require("./routes/flowers");
app.use("/flowers", flowersRoute);
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user, "user"); //req user comes from passport
  console.log(req.isAuthenticated(), "funki");
  next();
});
//Routes Imports
const usersRoute = require("./routes/users");

app.use("/users", usersRoute);

app.get("/putka", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).send("no premissin");
  } else {
    res.send("dsdsadas");
  }
});
app.get("/", (req, res) => {
  console.log(req.user, "ghomemememe");
  res.send("Hello World!");
});
//--End routes

// SERVER
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
