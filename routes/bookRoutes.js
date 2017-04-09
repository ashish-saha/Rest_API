var express = require ('express');

var routes = function (Book) {
	
	var bookRouter = express.Router();	// an instance of the router
	var bookController = require ('../controllers/bookController')(Book);
	
	bookRouter.route ('/')
		.post(bookController.post)

		.get (bookController.get);

	// Middleware that intercept the request and add the specific book to the request
	bookRouter.use('/:bookId', function (req, res, next) {
		Book.findById (req.params.bookId, function (err, book) {
			if (err)
				res.status(500).send(err);
			else if (book) {
				req.book = book;
				next ();
			} else
				res.status(404).send("no Book found");
		});
	});

	bookRouter.route('/:bookId')
		.get (function (req, res) {
			res.json (req.book);
		})
		.put (function (req, res) { 
			req.book.title = req.body.title;
			req.book.author = req.body.author;
			req.book.genre = req.body.genre;
			req.book.read = req.body.genre;
			req.book.save(function (err) {
				if (err)
					res.status(500).send(err);
				else
					res.json(req.book);
			});				
		})
		.patch (function (req, res) {
			if (req.body._id)
				delete req.body._id;
			for (var p in req.body) {
				req.book[p] = req.body[p];
			}

			req.book.save(function (err) {
				if (err)
					res.status(500).send(err);
				else 
					res.json(req.book);
			});
		})
		.delete (function (req, res) {
			req.book.remove(function (err) {
				if (err)
					res.satus(500).send();
				else
					res.status(204).send("removed");
			});
		}); 

	return bookRouter;
};

module.exports = routes;




