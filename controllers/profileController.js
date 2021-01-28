const pool = require("../db");

exports.allProfiles = async (req, res) => {
  console.log(req.user);

  try {
    const checkemail = await pool.query(
      "SELECT fullname ,nickname,profile_id,images,city,age FROM profile"
    );

    res.json(checkemail.rows);
  } catch (err) {
    console.log(err);
  }
};

exports.singleProfile = async (req, res) => {
  const id = req.params.id;

  try {
    const checkemail = await pool.query(
      "SELECT * FROM profile WHERE profile_id=$1",
      [id]
    );

    res.json(checkemail.rows);
  } catch (err) {
    console.log(err);
  }
};

exports.latestProfiles = async (req, res) => {
  try {
    const latestProfiles = await pool.query(
      "SELECT profile_id,fullname,images FROM profile ORDER BY created_at DESC LIMIT $1",
      [5]
    );

    res.json(latestProfiles.rows);
  } catch (err) {
    console.log(err);
  }
};
