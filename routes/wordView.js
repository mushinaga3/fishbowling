var express = require('express');
var router  = express.Router();
const pg    = require('pg');
const fs    = require('fs');
const Blob = require("cross-blob");
const URL = require('url');
const pool  = new pg.Pool({
  user: 'mushi',
  host: 'localhost',
  database: 'mushi',
  password: 'mushi37',
  port: 5432
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  const select = 'SELECT * FROM SENTENCES';
  pool.query(select, (err, result) => {
    let texts = [];
    for (let i=0; i<result.rows.length; i++){
      texts[i] = result.rows[i].word;
    }
    let text =  texts.toString().replace(/,/g, "\n");

      fs.writeFileSync("views/text.ejs", text, (err) => {
        if (err) {
          console.log('失敗！');
        } else {
          console.log('成功！');
        }
      });
      res.render('wordView', {
        title: '表示しています',
        boxs: result.rows
      });
  });
});

module.exports = router;