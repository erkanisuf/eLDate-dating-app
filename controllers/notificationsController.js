const pool = require("../db");

exports.getMSGNotifications = async (req, res, next) => {
  try {
    const getProfiles = await pool.query(
      "SELECT received_by , conversation_id,readed FROM messages WHERE received_by=$1 AND readed=false ",
      [req.user]
    );

    return res.status(200).json(getProfiles.rows);
  } catch (err) {
    console.log(err);
  }
};

exports.readMessages = async (req, res, next) => {
  try {
    const updtatetoRead = await pool.query(
      "UPDATE messages SET readed = true WHERE received_by=$1 AND conversation_id = $2 ",
      [req.user, req.body.conversation_id]
    );

    return res.status(200).json({ message: "updated readed msg" });
  } catch (err) {
    console.log(err);
  }
};
