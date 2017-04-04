var express = require ('express');
var	mongoose = require ('mongoose');
var bodyParser = require ('body-parser');


/**	
open an connection to the databse
and host that for us until we are ready
since bookAPI doest exists it will actually create it for us
**/

// mongoose used something called model
// it is an instance of our book schema 
var db = mongoose.connect('mongodb://localhost/bookAPI');			

var Book = require ('./models/bookModel');

var app = express ();   				// creating and instance of express that we can use
										// () means we will execute that
var port = process.env.PORT || 3000;

app.use (bodyParser.urlencoded({extended:true}));
app.use (bodyParser.json());



var bookRouter = express.Router (); //an instance of router

bookRouter.route ('/Books')
	.post(function (req, res) {
		//	we need a bodyparser, its a piece of middleware that allows express to read the body and parse that into a json object that we can understand 	
		var book = new Book (req.body);
		console.log(book);
		res.send(book);
	})

	.get (function (req, res) {
		var query = {};
		if (req.query.genre)
		{
			query.genre = req.query.genre;
		}


		Book.find (query, function (err, books){
			if (err)
				res.status(500).send(err);
			else 
				res.json (books);
		});

	});


bookRouter.route('/Books/:bookId')
	.get (function (req, res) {

//		var params = "";
//		if (Book.findById(req.params.bookId) !== null)
//			params=req.params.bookId;

		Book.findById (req.params.bookId, function (err, books) {
			if (err)
				res.status(500).send(err);
			else 
				res.json (books);
		});
	});




app.use ('/api', bookRouter);








app.get ('/', function (req, res) {
	res.send ("Gulp is making me Welcome my API");
});


app.listen (port, function () {
	console.log ("Gulp is Runnung on port: " + port);
});