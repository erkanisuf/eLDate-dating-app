const pool = require("../db");
const User = require("../models/usersModel");
const { validationResult } = require("express-validator");

//
// select conversation_id
//     group by conversation_id
//     having bool_and(user_id in ($1, $2))

exports.newChat = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const id = Number(req.params.id); //ID From CLIENT user_id not the profile ID
  const text = req.body.text;
  if (id === req.user) {
    return res.status(422).json({ message: "Cant message yourself!" });
  }
  try {
    const dupeConversation = await pool.query(
      `SELECT * 
      FROM participants WHERE
       conversation_id IN (
          SELECT conversation_id
          FROM participants
           WHERE user_id IN ($1,$2)
          GROUP BY conversation_id
          HAVING COUNT(*) > 1
      ) `,
      [req.user, id]
    );

    if (!dupeConversation.rows.length) {
      const startConversation = await pool.query(
        `WITH ins1 AS (
            INSERT INTO conversations(created_at, user_id_started)
            VALUES (CURRENT_TIMESTAMP, $1)
            RETURNING id AS conversation_id
            )
         , ins2 AS (
            INSERT INTO participants (conversation_id, user_id)
            SELECT conversation_id, $1 FROM ins1
            RETURNING id AS participants_id
            ), ins3 AS (
         INSERT INTO messages (conversation_id, participant_id,sender_id,message,created_at,received_by)
         SELECT conversation_id,(SELECT participants_id FROM ins2),$1,$2, CURRENT_TIMESTAMP,$3 FROM ins1
            RETURNING received_by AS backtoparticipant)
            INSERT INTO participants (conversation_id, user_id)
            SELECT conversation_id ,(SELECT backtoparticipant FROM ins3) FROM ins1`,
        [req.user, text, id]
      );
    } else {
      const sendOnlyMessage = await pool.query(
        `INSERT INTO messages(conversation_id,participant_id,sender_id,message,created_at,received_by)
        VALUES ($1, $2, $3,$4, CURRENT_TIMESTAMP,$5);`,
        [
          dupeConversation.rows[0].conversation_id,
          dupeConversation.rows[0].id,
          req.user,
          text,
          id,
        ]
      );
    }

    res.json({ message: "message send!" });
  } catch (err) {
    console.log(err);
  }
};

exports.getMyConversations = async (req, res) => {
  try {
    const findConversations = await pool.query(
      `SELECT DISTINCT conversation_id FROM participants
      WHERE user_id=$1`,
      [req.user]
    ); //This query my conversations(with my ID)
    const mapItems = findConversations.rows.map((el) => el.conversation_id);

    const resultofChats = await pool.query(
      `SELECT * FROM participants
        WHERE conversation_id= ANY($1::int[])`,
      [mapItems]
    ); //This finds all conversation ID with the maped ids
    console.log(resultofChats.rows);
    return res.json(findConversations.rows);
  } catch (err) {
    console.log(err);
  }
};
