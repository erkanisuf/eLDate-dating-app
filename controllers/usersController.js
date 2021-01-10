const pool = require("../db");
const bcrypt = require("bcrypt");
const User = require("../models/usersModel");

//

exports.newUser = async (req, res) => {
  const { username, password, email, age } = req.body;
  const checkemail = await pool.query(
    "SELECT email FROM userstable WHERE email=$1",
    [email]
  );
  const checkusername = await pool.query(
    "SELECT username FROM userstable WHERE username=$1",
    [username]
  );
  if (checkemail.rows.length || checkusername.rows.length) {
    return res.status(401).send("Email or Username Already Exists");
  }

  try {
    let hashedPasssword = await bcrypt.hash(password, 12);
    const newuser = new User(username, hashedPasssword, email, 1, age);
    newuser.save();
    res.status(200).send({ message: "sucsessfuly created user!" });
  } catch (err) {
    console.log(err);
  }
};

exports.Profile = async (req, res) => {
  console.log(req.cookies);
  if (req.isAuthenticated()) {
    const checkusername = await pool.query(
      "SELECT * FROM userstable WHERE user_id=$1",
      [req.session.passport.user]
    );
    res.send(checkusername.rows);
  } else {
    res.status(401).send("No access");
  }
};
