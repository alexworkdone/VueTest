// Include Packages
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');


/* -------------------------------------------------- */
// Convert sass file to css
	gulp.task('create-css-file', function () {
		return gulp.src('scss/bundle.scss')
			.pipe(sourcemaps.init())
				.pipe(sass().on('error', sass.logError))
				.pipe(autoprefixer({
					browsers: ['last 10 versions']
				}))
				.pipe(cleanCSS())
				.pipe(rename('bundle.min.css'))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('../css/'));
	});



/* -------------------------------------------------- */
// Create js file
	gulp.task('create-js-file', function () {
		return gulp.src('js/*')
			.pipe(concat('scripts.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('../js/'));
	});


/* -------------------------------------------------- */
// Create library css
	gulp.task('concat-css', function() {
		return gulp.src([   
			
		])
		.pipe(concat('lib.min.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('../css/'));
	});


/* -------------------------------------------------- */
// Create library js
	gulp.task('concat-js', function() {
		return gulp.src([   
			'libs/js/jquery-3.2.1.min.js'
		])
		.pipe(concat('lib.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('../js/'));
	});


/* -------------------------------------------------- */
// Watches
	gulp.task('watch', function () {
		gulp.watch('scss/*.scss', ['create-css-file']);
		gulp.watch('js/*.js', ['create-js-file']);
	});


/* -------------------------------------------------- */
// Concat all
	gulp.task('concat-all', function () {
		gulp.run('concat-css', 'concat-js');
	});


/* -------------------------------------------------- */
// Main Task
	gulp.task('default', function () {
		gulp.run('create-css-file', 'watch');
	});