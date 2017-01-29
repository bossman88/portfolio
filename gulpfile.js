// load gulp
var gulp = require('gulp');


// load modules
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();


// clean dist/css folder
gulp.task('cleancss', function(){
	return gulp.src('dist/css', { read: false }).pipe(clean());
});


// less compilation
gulp.task('less', ['cleancss'], function(){
	return gulp
		.src('./src/less/index.less')
		.pipe(less())
		.pipe(sourcemaps.init())
		.pipe(postcss([autoprefixer()]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});


// watch for changes and act
gulp.task('watch', ['less'], function(){

	browserSync.init({
		// set what files be served
		proxy: {
			target: "http://portfolio.local",
		},
		open: 'external',
		host: 'portfolio.local',
		port: 3000,
		files: [
			'dist/**/*.css',
			'**/*.html'
		]
	});

	gulp.watch('src/less/**/*.less', ['less']);
});


// the default task
gulp.task('default', ['watch']);
