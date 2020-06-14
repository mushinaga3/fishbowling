const express = require('express');
const router = express.Router();
const pg = require('pg');
const fs = require('fs');

const pool = new pg.Pool({
  user: 'mushi',
  host: 'localhost',
  database: 'mushi',
  password: 'mushi37',
  port: 5432
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',{
      title: 'ファイルを表示する'
    });
});

router.post('/', (req, res, next) => {
  let filename = req.body.file;
  let text = fs.readFileSync(filename, 'utf8');
  console.log(text);
  pool.query(text,(err)=>{
    if(err){
      console.log('失敗');
      res.render('index', {title: 'エラーが発生しました'});
    } else {
      console.log('成功');
      res.render('index', {title: '成功しました'});
    }
  });
});

module.exports = router;