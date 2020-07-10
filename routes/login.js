const express = require('express');
const router = express.Router();
const postgres = require('../sql');


router.get('/', function(req, res, next) {
    res.render('login', {
      err: ''
    });
});

router.post('/', (req, res, next) => {
  let id = req.body.nameId;
  let pass = req.body.pass;
  let login = `SELECT ID, PASSWORD FROM ADMIN WHERE ID = '${id}' AND PASSWORD = '${pass}'`;
  postgres.query(login, (err, result)=>{
    console.log(result.rows[0]);
    if (result.rows[0] == undefined) {
      res.render('login',{
        err: 'idまたはpasswordが違います'
      });
    } else {
      req.session.loginId = result.rows[0].id;
      res.render('index',{
        showmsg: ''
      });
    }
  });
});

module.exports = router;