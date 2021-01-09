const pool = require("../db");
const bcrypt = require("bcrypt");
const User = require("../models/usersModel");

exports.getUser = (req, res, next) => {
  res.send("This is Users");
};

exports.getFLowers = async (req, res, next) => {
  try {
    const query = await pool.query("SELECT * FROM userstable");

    res.send(query.rows);
  } catch (err) {
    console.log(err);
  }
};

//

exports.newUser = async (req, res) => {
  const { username, password, email } = req.body;
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
    const newuser = new User(username, hashedPasssword, email);
    newuser
      .save()
      .then(() => res.send("Successfully created user!"))
      .catch(() => res.send("error - something went wrong!"));
  } catch (err) {
    console.log(err);
  }
};

exports.logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findByEmail(email);

    if (!findUser.rows.length) {
      return res.status(401).send("Username of password wrong!");
    }
    const checkPassword = await bcrypt.compareSync(
      password,
      findUser.rows[0].password
    );
    if (!checkPassword) {
      return res.status(401).send({
        message: "Username of password wrong!",
      });
    }
    res.status(200).send({
      message: "Logged in !",
      user: findUser.rows[0].username,
    });
  } catch (err) {
    console.log(err);
  }
};
