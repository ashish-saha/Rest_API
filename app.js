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


var bookRouter = require ('./routes/bookRoutes')(Book); // have to execute that in order to return back the bookrouter
app.use ('/api/books', bookRouter);

app.get ('/', function (req, res) {
	res.send ("Gulp is making me Welcome my API");
});


app.listen (port, function () {
	console.log ("Gulp is Runnung on port: " + port);
});





