const express = require("express");
const chatController = require("../controllers/chatController");
const router = express.Router();
const isLogedin = require("../middleware/isLogedin");
const validator = require("../middleware/validator");
const db = require("../db");
//IMPORTS

// GET /feed/posts
router.post(
  "/startconversation/:id",
  isLogedin,
  validator.checkChatMessage,
  chatController.newChat
);

router.get(
  "/getmyconversations",
  isLogedin,

  chatController.getMyConversations
);

router.get(
  "/getmessages/:id",
  isLogedin,

  chatController.getMyChat
);

//PUSHER
// PUSHER
//IMPORTANT WITHOUTH BODY PARSERS SOCKET DOEST GET ID , GIVES UNDEFINED!!!
const bodyParser = require("body-parser");
const Pusher = require("pusher");
const pg = require("pg");
let pgClient;
const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_CONNECTION_URL,
});

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});
router.use(bodyParser.urlencoded({ extended: false })); //THIS OR WONT WORK !
router.post("/message/send", async (req, res) => {
  // 'private' is prefixed to indicate that this is a private channel
  const { username, conversationID } = req.body; //// THIS IS THE ID OF THE SENDER_ID AND THE CONVERSATION ID !!
  const findIFUserCanGet = await db.query(
    `SELECT * FROM messages WHERE conversation_id=$1 AND sender_id=$2 OR received_by = $2`,
    [conversationID, req.user]
  );

  if (
    findIFUserCanGet.rows[0].sender_id != req.user &&
    findIFUserCanGet.rows[0].received_by != req.user
  ) {
    return res.status(401).json({ message: "No premission" });
  }
  // THIS ^ HERE CHECKS IF IT CAN BE CHEATED , IF THERE IS NO CONVERSATION BETWEEN THESE TWO IT SENDS ERROR

  pusher.trigger("private-" + req.body.conversationID, "messages", {
    message: req.body.message,
    created_at: new Date(), // LATER FIX THIS TO BE CURRENT TIME WHEN ITS SEND ----------------------------"2021-01-15T01:20:18.323Z",
    sender_id: req.user,
    images: [req.body.chatimage],
    fullname: req.body.fullname,
  });

  res.sendStatus(200);
});

// API route used by Pusher as a way of authenticating users
router.post("/pusher/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;

  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

module.exports = router;
