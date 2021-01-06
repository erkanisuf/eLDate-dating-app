const pool = require("../db");
// Database

module.exports = class User {
  constructor(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  save() {
    return pool.query(
      "INSERT INTO userstable(username,password,email,created_on)VALUES($1,$2,$3,CURRENT_TIMESTAMP)",
      [this.username, this.password, this.email]
    );
  }

  static findByEmail(email) {
    return pool.query("SELECT * FROM userstable WHERE email=$1", [email]);
  }
};
