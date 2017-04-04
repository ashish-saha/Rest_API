var gulp = require ('gulp');
var nodemon = require ('gulp-nodemon');

gulp.task ('default', function () {
	nodemon ({					//nodemon takes a json object to configure itself
		script: 'app.js',
		ext: 'js',
		env: {
			PORT: 8000
		},
		ignore: ['./node_modules**']
	})	
	.on('restart', function () {
		console.log ('We have restarted');
	});				
});