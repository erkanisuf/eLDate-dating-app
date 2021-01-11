const pool = require("../db");
const bcrypt = require("bcrypt");
const User = require("../models/usersModel");
const { validationResult } = require("express-validator");

//

exports.newUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
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

exports.getUser = async (req, res) => {
  console.log(req.user);
  const userFind = await User.findProfile(req.user);
  const {
    fullname,
    nickname,
    description,
    sex,
    relationship,
    searching,
    age,
    phone,
    height,
    weight,
    city,
    country,
  } = userFind.rows[0];

  res.json({
    data: {
      fullname: fullname,
      nickname: nickname,
      description: description,
      sex: sex,
      relationship: relationship,
      searching: searching,
      age: age,
      phone: phone,
      height: height,
      weight: weight,
      city: city,
      country: country,
    },
    token: "thisistoken",
  });
};

exports.editProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const {
    fullname,
    nickname,
    description,
    sex,
    relationship,
    searching,
    height,
    weight,
    city,
    country,
    age,
  } = req.body;
  try {
    const saveEdit = await User.editProfile(
      fullname,
      nickname,
      description,
      sex,
      relationship,
      searching,
      height,
      weight,
      city,
      country,
      age,
      req.user
    );
    res.status(200).send({ message: "updated sucsessfuly!" });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "SOmething went wrong", error: err });
  }
};
