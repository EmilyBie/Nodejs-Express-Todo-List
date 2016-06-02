var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Todo.find().sort('-update_at').exec(function(err,todos){
    if (err) {
      return next(err);
    }
    res.render('index',{title: 'Todo List', todos: todos});
  });
});

router.post('/create',function(req, res, next) { 
  new Todo({
    content : req.body.content,
    update_at : Date.now()
  }).save(function(err, todo, count) {
    console.log('save todo success');
    res.redirect('/');
  });
});

router.get('/destroy/:id',function(req,res,next) {
  Todo.findById(req.params.id,function(err,todo) {
    todo.remove(function(err,todo){
      res.redirect('/');
    });
  });
});

router.get('/edit/:id', function(req, res, next) {
  Todo.find().sort('-update_at').exec(function(err,todos) {
    if (err) {
      return next(err);
    }
    res.render('edit',{
      title: 'Todo List',
      todos: todos,
      current: req.params.id
    });
  });
});

router.post('/update/:id', function(req,res,next) {
  Todo.findById(req.params.id, function(err,todo) {
    todo.content = req.body.content;
    todo.update_at = Date.now();
    todo.save(function(err,todo,count){
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });

  });
});

module.exports = router;
