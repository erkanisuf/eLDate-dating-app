const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DATABASEPG_USER,
  password: process.env.DATABASEPG_PASSWORD,
  host: process.env.DATABASEPG_HOST,
  port: process.env.DATABASEPG_PORT,
  database: process.env.DATABASEPG_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
