const express = require('express');
const router = express.Router();
const fs = require('fs');
const postgres = require('../sql');


router.get('/', function(req, res, next) {
  if (req.session.loginId){
    res.render('index',{
      showmsg: ""
    });
  } else {
    res.render('login',{
      err: ""
    });
  }
});

router.post('/', (req, res, next) => {
  let filename = req.body.file;
  let title = req.body.title;
  let word = req.body.word;
  try {
    fs.statSync(filename);
    let text = fs.readFileSync(filename, 'utf8');
    postgres.query(text,(err)=>{
      if(err){
        res.render('index', {showmsg: 'エラーが発生しました'});
      } else {
        res.render('index', {showmsg: 'ファイル成功'});
      }
    });
  } catch(err) {
    if (!title || !word) {
      res.render('index', {showmsg: '入力してください'});
    } else {
      let insert = `INSERT INTO COLLAGE (TITLE, WORD) VALUES ('${title}','${word}')`;
      postgres.query(insert, (err)=>{
        if(err){
          res.render('index', {showmsg: 'エラーが発生しました'});
        } else {
          res.render('index', {showmsg: 'テキスト成功'});
        }
      });
    }
  }
});

// router.post('/', (req, res, next) => {
//   let filename = req.body.file;
//   let text = fs.readFileSync(filename, 'utf8');
//   postgres.query(text,(err)=>{
//     if(err){
//       res.render('index', {title: 'エラーが発生しました'});
//     } else {
//       res.render('index', {title: '成功しました'});
//     }
//   });
// });

module.exports = router;