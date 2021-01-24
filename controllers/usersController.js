const pool = require("../db");
const bcrypt = require("bcrypt");
const User = require("../models/usersModel");
const { validationResult } = require("express-validator");
/// Mailer Imports
var jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.MY_EMAIL_SENDER,
    },
  })
);

//

exports.newUser = async (req, res, next) => {
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
    // res.status(200).json({ message: "sucsessfuly created user!" });
    next();
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
    images,
  } = userFind.rows[0];

  res.json({
    profile: {
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
      images: images,
    },
    token: req.user,
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
//FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const checkemail = await pool.query(
      "SELECT email FROM userstable WHERE email=$1",
      [req.body.email]
    );

    if (!checkemail.rows.length) {
      return res.status(401).send("Not found any users !");
    }
    const randomNum = uuidv4();
    const editResetPassword = await pool.query(
      "UPDATE userstable SET resetpassword = $1 WHERE email = $2 RETURNING resetpassword",
      [randomNum, req.body.email]
    );

    const token = jwt.sign(
      {
        data: editResetPassword.rows[0].resetpassword,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: 60 * 60 }
    );

    transporter
      .sendMail({
        to: req.body.email,
        from: "djerimixer2260@abv.bg",
        subject: "Reset your password",
        html:
          "<h1><a href= " +
          process.env.MY_FRONTEND +
          "/" +
          token +
          ">Click here to reset your password !</a></h1>",
      })
      .then((el) => console.log(el, "el"))
      .catch((err) => console.log(err));

    res
      .status(200)
      .send({ message: "Email Succsesfully sended to: " + req.body.email });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "SOmething went wrong", error: err });
  }
};

//RESET PASSWORD

exports.resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const decodeToken = jwt.verify(req.params.id, process.env.SECRET_TOKEN);
    console.log(decodeToken);
    if (!decodeToken.data) {
      res.status(401).send({ message: "Expired token !", error: err });
    }
    const findUserToReset = await pool.query(
      "SELECT * FROM userstable WHERE resetpassword = $1 ",
      [decodeToken.data]
    );
    if (!findUserToReset.rows.length) {
      res.status(401).send({
        message: "Expired token ! or something went wrong!",
        error: err,
      });
    }
    let hashedPasssword = await bcrypt.hash(req.body.password, 12);
    const changeThePassword = await pool.query(
      "UPDATE userstable SET password = $1 WHERE email = $2 ",
      [hashedPasssword, findUserToReset.rows[0].email]
    );

    res.status(200).send({
      message: `Succsesfully changed!`,
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "SOmething went wrong", error: err });
  }
};
