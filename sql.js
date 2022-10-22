// const pg = require('pg');
const { Pool } = require("pg");

// const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL
// });
const pool = new Pool({
  user: "user",
  host: "dashboard.render.com",
  database: "fishbowling",
  password: "zMFAUfVHzKChodCo06anA7oakRWwJmM3",
  port: 5432,
});

module.exports = pool;
