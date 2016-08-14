var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uw03mypu');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/bdn.api+json' }));
app.use(methodOverride());

app.get('*', function(req, res) {
	res.sendfile('public/index.html')
});


app.listen(8080);
console.log('App listening on port 8080.');

//definte model
var Todo = mongoose.model('Todo', {
	text : String
});

//routes

	//api --
	//get all todos
	app.get('/api/todos', function(req,res) {
		Todo.find(function(err, todos) {
			//error in resonse to bad retrieval.
			if (err)
				res.send(err)

			//returns todos in a json format
			res.json(todos);
		});

	});

	app.post('/api/todos', function(req, res) {

		Todo.create({
			text: req.body.text,
			done: false
		}, function(err, todo) {
			if (err)
				res.send(err);

			//get and find all the created todos
			Todo.find(function(err, todos) {
				if(err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});
