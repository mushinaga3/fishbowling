const { Client } = require('pg');

const dbPostgreSQL = new Pool({
  connectionString: process.env.DATABASE_URL
});

const client = new Client();

client.connect();

client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message);
  client.end();
});



// let mysql = require('mysql');

// let dbConfig = {
//   host: 'abenocamp.cqf07wodquwz.ap-northeast-1.rds.amazonaws.com',
//   user: 'admin',
//   password: 'abenomembers',
//   database: 'running'
// };

// let connection = mysql.createConnection(dbConfig);

// module.exports = connection;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});