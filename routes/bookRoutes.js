var express = require ('express');

var routes = function (Book) {
	
	var bookRouter = express.Router();	// an instance of the router
		bookRouter.route ('/')
			.post(function (req, res) {
				//	we need a bodyparser, its a piece of middleware that allows express to read the body and parse that into a json object that we can understand 	
				var book = new Book (req.body);
				book.save ();
				console.log(book);
				res.status(201).send(book);
			})

			.get (function (req, res) {
				var query = {};
				if (req.query.genre || req.query.title || req.query.author)
					query = req.query;


				Book.find (query, function (err, books){
					if (err)
						res.status(500).send(err);
					else 
						res.json (books);
				});

			});

		bookRouter.route('/:bookId')
			.get (function (req, res) {
				Book.findById (req.params.bookId, function (err, books) {
					if (err)
						res.status(500).send(err);
					else 
						res.json (books);
				});
			});

	return bookRouter;
};

module.exports = routes;




