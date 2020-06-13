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
  const select = 'SELECT word FROM SENTENCES';
  pool.connect((err, client)=>{
    client.query(select,(box, result)=>{
      let boxs = [];
      for (let i=0; i<result.rowCount; i++){
        boxs = result.rows[i].word;
        console.log(result.rows[i].word);
        i+1;
      }
      res.render('index', {datas: 'txtファイルを選択してください'});
    });
  });
});

router.post('/', (req, res, next) => {
  let filename = req.body.file;
  let text = fs.readFileSync(filename, 'utf8');
  console.log(text)
  pool.connect((err,client)=>{
    client.query(text, (err,result)=>{
      if(err){
        console.log('失敗');
        res.render('index', {datas: 'エラーが発生しました'});
      } else {
        console.log('成功');
        res.render('index', {datas: '成功しました'});
      }
    });
  });
});

module.exports = router;