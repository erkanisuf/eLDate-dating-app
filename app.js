const express = require("express");

const app = express();
const port = 4000;

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
    aameSite: true,
    secure: false, // ENABLE ONLY ON HTTPS
  },
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
// ========== end

//Routes Imports
const usersRoute = require("./routes/users");
const profilesRoute = require("./routes/profiles");
const chatRoute = require("./routes/chat");

app.use("/users", usersRoute);
app.use("/profiles", profilesRoute);
app.use("/chat", chatRoute);
// app.get("/getcookie", (req, res) => {

//   if (req.isAuthenticated()) {
//     res
//       .writeHead(200, {
//         "Set-Cookie": "token=encryptedstring;",
//         "Access-Control-Allow-Credentials": "true",
//       })
//       .send();
//   } else {
//     console.log("notin");
//   }
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// -========End routes

// // PUSHER
// const pg = require("pg");
// let pgClient;
// const pool = new pg.Pool({
//   connectionString: process.env.POSTGRES_CONNECTION_URL,
// });

// const pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_APP_KEY,
//   secret: process.env.PUSHER_APP_SECRET,
//   cluster: process.env.PUSHER_APP_CLUSTER,
//   useTLS: true,
// });
// app.use(bodyParser.urlencoded({ extended: false }));
// app.post("/message/send", async (req, res) => {
//   // 'private' is prefixed to indicate that this is a private channel
//   const { username, conversationID } = req.body; //// THIS IS THE ID OF THE SENDER_ID AND THE CONVERSATION ID !!
//   const findIFUserCanGet = await db.query(
//     `SELECT * FROM messages WHERE conversation_id=$1 AND sender_id=$2 OR received_by = $2`,
//     [conversationID, req.user]
//   );

//   if (
//     findIFUserCanGet.rows[0].sender_id != req.user &&
//     findIFUserCanGet.rows[0].received_by != req.user
//   ) {
//     return res.status(401).json({ message: "No premission" });
//   }
//   // THIS ^ HERE CHECKS IF IT CAN BE CHEATED , IF THERE IS NO CONVERSATION BETWEEN THESE TWO IT SENDS ERROR

//   pusher.trigger("private-" + req.body.conversationID, "messages", {
//     message: req.body.message,
//     created_at: "2021-01-15T01:20:18.323Z", // LATER FIX THIS TO BE CURRENT TIME WHEN ITS SEND ----------------------------
//     sender_id: req.user,
//   });

//   res.sendStatus(200);
// });

// // API route used by Pusher as a way of authenticating users
// app.post("/pusher/auth", (req, res) => {
//   const socketId = req.body.socket_id;
//   const channel = req.body.channel_name;
//   const auth = pusher.authenticate(socketId, channel);
//   res.send(auth);
// });
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
