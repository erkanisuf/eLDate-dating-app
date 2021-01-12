const pool = require("../db");
// Database

module.exports = class User {
  constructor(username, password, email, typereg_id, age) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.typereg_id = typereg_id;
    this.age = age;
  }
  save() {
    return pool.query(
      `WITH ins1 AS(INSERT INTO userstable(username,password,email,created_on,typereg_id)
    VALUES($1,$2,$3,CURRENT_TIMESTAMP,$4)
   RETURNING user_id)
      INSERT INTO profile (userlog_id, age)
      SELECT user_id, $5 FROM ins1
      RETURNING *`,
      [this.username, this.password, this.email, this.typereg_id, this.age]
    );
  }

  static findByEmail(email) {
    return pool.query("SELECT * FROM userstable WHERE email=$1", [email]);
  }
  static findByID(id) {
    return pool.query("SELECT * FROM userstable WHERE user_id=$1", [id]);
  }

  static findProfile(id) {
    return pool.query("SELECT * FROM profile WHERE userlog_id=$1", [id]);
  }
  static editProfile(
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
    id
  ) {
    return pool.query(
      `UPDATE profile
    SET fullname = $1 ,nickname=$2,description=$3,sex=$4,relationship=$5,searching=$6,height=$7,weight=$8,city=$9,country=$10,age=$11
    WHERE userlog_id = $12
    `,
      [
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
        id,
      ]
    );
  }
};
