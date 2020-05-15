var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysql_setting = {
  host:'localhost',
  port:8889,
  user:'root',
  password:'root',
  database:'taskManagementDB'
}

var title = 'タスク整理アプリ';
/* GET home page. */
router.get('/', function(req, res, next) {
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('SELECT * from task ORDER BY id desc',
    function(error, results, fields){
      if(error == null){
        var data = {title: title, content:results};
        res.render('index', data);
      }else{
        console.log(error);        
      }
    });
  connection.end();
});

// タスク追加処理
router.post('/add',(req,res,next)=>{
  const newTask = req.body.newTask;
  const tag = req.body.contentTag;
  const time = new Date();
  
  const data = {content:newTask, startTime:time, contentTag:tag};

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();

  connection.query('insert into task set ?', data,
      function(error, results, fields){
        if(error){
          console.log(error);
        }
        res.redirect('/');
      });
  connection.end();
});

// タスク編集ページ
router.get('/edit',(req,res,next)=>{
  var id = req.query.id;
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('SELECT * from task where id=?', id,
      function(error, results, fields){
        if(error == null){
          var data = {title: title, content:results[0]};
          res.render('edit', data);
        }else{
          console.log(error);        
        }
      });
  connection.end();
});

//タスク更新処理
router.post('/edit',(req,res,next)=>{
  const id = req.body.taskId;
  const taskContent = req.body.task;
  const tagValue = req.body.contentTag;
  const data = {'content':taskContent,'contentTag':tagValue};
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();

  connection.query('UPDATE task set ? where id=?',[data, id],
    function(error, results, fields){
    if(error == null){
      res.redirect('/');
    }else{
      console.log(error);        
    }
  });
  connection.end();
});

// タスク削除処理
router.post('/delete',(req,res,next)=>{
  var id = req.body.id;
  console.log('idのテスト');
  console.log(id);
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();

  connection.query('delete from task where id=?', id,
    function(error, results, fields){
    if(error == null){
      res.redirect('/');
    }else{
      console.log(error);        
    }
  });
  connection.end();
});


module.exports = router;
