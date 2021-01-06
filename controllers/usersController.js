const pool = require("../db");
exports.getUser = (req, res, next) => {
  res.send("This is Users");
};

exports.getFLowers = async (req, res, next) => {
  try {
    const query = await pool.query("SELECT * FROM userstable");
    console.log(query.rows[1]);
    res.send(query.rows);
  } catch (err) {
    console.log(err);
  }
};
