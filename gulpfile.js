var gulp = require ('gulp');
var nodemon = require ('gulp-nodemon');
var gulpMocha = require ('gulp-mocha');

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


gulp.task ('test', function () {
	gulp.src('tests/*.js', {read: false})
		.pipe(gulpMocha({reporter: 'nyan'})) 
});