const pool = require("../db");
const moment = require("moment");
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

//Filter
exports.filterProfiles = async (req, res) => {
  const {
    theyAre,
    theyLook,
    relationshipStatus,
    ageFrom,
    ageTo,
    heightFrom,
    heightTo,
    weightFrom,
    weightTo,
  } = req.body;

  //Ages
  const getYearDate = new Date();
  const minusDateFrom = new Date(getYearDate.getFullYear() - ageFrom, 1);
  const minusDateTo = new Date(getYearDate.getFullYear() - ageTo, 1);
  const calculateDateFrom = moment(minusDateFrom.setMonth(0)).format(
    "YYYY-MM-DD"
  );
  const calculateDateTo = moment(minusDateTo.setMonth(0)).format("YYYY-MM-DD");
  //

  console.log(calculateDateFrom, calculateDateTo);
  console.log(heightFrom, heightTo, weightFrom, weightTo);
  try {
    const filterProfiles = await pool.query(
      `SELECT fullname ,nickname,profile_id,images,city,age FROM profile WHERE  sex=$1 AND searching= $2 AND relationship = $3 AND
      age >= $4 AND age <= $5 AND  weight BETWEEN $6 AND $7 AND height BETWEEN $8 AND $9  `,
      [
        theyAre,
        theyLook,
        relationshipStatus,
        calculateDateTo,
        calculateDateFrom,
        weightFrom,
        weightTo,
        heightFrom,
        heightTo,
      ]
    );

    res.status(200).json({ message: "Filtered", data: filterProfiles.rows });
  } catch (err) {
    console.log(err);
  }
};
