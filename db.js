const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "need226090",
  host: "localhost",
  port: 5432,
  database: "users",
});

module.exports = pool;
