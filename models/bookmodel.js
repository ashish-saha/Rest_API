/** it is a json object that lays out what a book loos like
**/

var mongoose = require ('mongoose'),
	schema = mongoose.Schema;

// we will hate to layout inn json what a book looking like
var bookModel = new schema ({
	titile: {type: String},
	author: {type: String},
	genre: {type: String},
	read: {type: Boolean, default: false}
});

// its tells mongoose that we have a new model or new schema called book
module.exports = mongoose.model ('Book', bookModel);