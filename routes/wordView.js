var express = require('express');
var router  = express.Router();
const fs    = require('fs');
var postgres = require('../sql');
let box = [];
let number = [];
let texts = [];

router.get('/', (req, res, next) => {
  res.render('wordView', {
    btnText: "作成",
    texts: ""
  });
});

router.post('/', (req, res, next) => {
  let select = 'SELECT * FROM COLLAGE ORDER BY id';
  postgres.query(select, (err, result) => {
    for (let i=0; i<result.rows.length; i++){
      number[i] = result.rows[i].id;
    }
    for (let i=0; i<20;){
      let j = Math.floor(Math.random() * number.length);
      if (box.indexOf(j) < 0){
        box[i] = j;
        console.log(box[i]);
        texts[i] = result.rows[j].word;
        i++
      }
    }

    // 改行処理
    let text =  texts.toString().replace(/,/g, "\n");
      fs.writeFileSync("views/text.ejs", text);
      res.render('wordView', {
        btnText: "更新",
        texts: texts
      });
  });
});


// router.get('/', (req, res, next) => {
//   let select = 'SELECT * FROM COLLAGE ORDER BY id';
//   postgres.query(select, (err, result) => {
//     for (let i=0; i<result.rows.length; i++){
//       // box[i] = result.rows[i].word;
//       number[i] = result.rows[i].id;
//     }
//     for (let i=0; i<10;){
//       let j = Math.floor(Math.random() * number.length);
//       console.log(j);
//       if (box.indexOf(j) < 0){
//         box[i] = j;
//         texts[i] = result.rows[j].word;
//         i++
//       }
//     }
//     console.log(texts);

//     // 改行処理
//     let text =  texts.toString().replace(/,/g, "\n");
//       fs.writeFileSync("views/text.ejs", text);
//       res.render('wordView', {
//         texts: texts
//       });
//   });
// });


// router.get('/', function (req, res, next) {
//   let i = [1,2,3];
//   let select = `SELECT * FROM COLLAGE WHERE id IN (${i})`;
//   console.log(select);
//   postgres.query(select, (err, result) => {

//     let texts = [];
//     for (let i=0; i<result.rows.length; i++){
//       texts[i] = result.rows[i].word;
//     }
//     // 改行処理
//     let text =  texts.toString().replace(/,/g, "\n");
//       fs.writeFileSync("views/text.ejs", text);
//       res.render('wordView', {
//         title: '表示しています',
//         boxs: result.rows
//       });
//   });
// });


// router.get('/', function (req, res, next) {
//   const select = 'SELECT * FROM COLLAGE';
//   postgres.query(select, (err, result) => {
//     let texts = [];
//     for (let i=0; i<result.rows.length; i++){
//       texts[i] = result.rows[i].word;
//     }
//     // 改行処理
//     let text =  texts.toString().replace(/,/g, "\n");
//       fs.writeFileSync("views/text.ejs", text);
//       res.render('wordView', {
//         title: '表示しています',
//         boxs: result.rows
//       });
//   });
// });


// router.get('/', function (req, res, next) {
//   const select = 'SELECT * FROM COLLAGE';
//   postgres.query(select, (err, result) => {
//     let texts = [];

//     for (let i=0; i<result.rows.length; i++){
//       texts[i] = result.rows[i].word;
//     }

//     let text =  texts.toString().replace(/,/g, "\n");
//       fs.writeFileSync("views/text.ejs", text, (err) => {
//         if (err) {
//           console.log('失敗！');
//         } else {
//           console.log('成功！');
//         }
//       });
//       res.render('wordView', {
//         title: '表示しています',
//         boxs: result.rows
//       });
//   });
// });

module.exports = router;