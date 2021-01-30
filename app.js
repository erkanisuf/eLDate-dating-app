const express = require("express");
var path = require("path");
const app = express();
const port = process.env.PORT || 4000;

const bodyParser = require("body-parser");
const Pusher = require("pusher");

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

//Passport Imports
const passport = require("passport");
// --END passport

//Cors,Body parses Imports
//DATABASE Setting for Session
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // <-- location of the react app were connecting to
    credentials: true,
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
const db = require("./db");
const sessionConfig = {
  store: new pgSession({
    pool: db,
    tableName: "session",
  }),
  name: "mysession",
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    // maxAge: 15000,
    httpOnly: false,
    aameSite: true,
    secure: true, // ENABLE ONLY ON HTTPS
  },
  unset: "destroy",
  proxy: true,
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
// ========== end

//Routes Imports
const usersRoute = require("./routes/users");
const profilesRoute = require("./routes/profiles");
const chatRoute = require("./routes/chat");
const matchRoute = require("./routes/matches");
const notificationRoute = require("./routes/notifications");
const picturesRoute = require("./routes/pictures");

app.use("/users", usersRoute);
app.use("/profiles", profilesRoute);
app.use("/chat", chatRoute);
app.use("/matches", matchRoute);
app.use("/pictures", picturesRoute);
app.use("/notifications", notificationRoute);

app.get("/getcookie", (req, res) => {
  if (req.isAuthenticated()) {
    res
      .writeHead(200, {
        "Set-Cookie": "token=" + req.user,
        "Access-Control-Allow-Credentials": "true",
      })
      .send();
  } else {
    res.writeHead(401).send();
    // res.json({ message: "not logged in" });
  }
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// app.get("/", (req, res) => {
//   res.send("Hello and Welcome!!");
// });
// -========End routes

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
