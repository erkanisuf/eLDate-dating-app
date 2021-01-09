const pool = require("../db");
// Database

module.exports = class User {
  constructor(username, password, email, typereg_id) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.typereg_id = typereg_id;
  }

  save() {
    return pool.query(
      "INSERT INTO userstable(username,password,email,created_on,typereg_id)VALUES($1,$2,$3,CURRENT_TIMESTAMP,$4) RETURNING user_id ",
      [this.username, this.password, this.email, this.typereg_id]
    );
  }

  saveByFacebook() {
    return pool.query(
      "INSERT INTO userstable(username,password,email,created_on)VALUES($1,$2,$3,CURRENT_TIMESTAMP)",
      [this.username, this.password, this.email]
    );
  }

  static findByEmail(email) {
    return pool.query("SELECT * FROM userstable WHERE email=$1", [email]);
  }
  static findByID(id) {
    return pool.query("SELECT * FROM userstable WHERE user_id=$1", [id]);
  }
};
