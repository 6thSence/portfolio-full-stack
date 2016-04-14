const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const templateData = require('./templateData.json');
const postcss = require('gulp-postcss');
const assets = require('postcss-assets');
const short = require('postcss-short');
const cssnext = require('postcss-cssnext');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();

gulp.task('default', ['compile',
	'styles',
	'browser-sync',
	'assets',
	'fonts'
]);

gulp.task('compile', () => {
	options = {
		batch : ['./src/partials']
		}

	return gulp.src('src/logIn/*.hbs')
		.pipe(handlebars(templateData, options))
		.pipe(rename('logIn.html'))
		.pipe(gulp.dest('./static'));
});

gulp.task('styles', () => {
	const processors = [
		cssnext({
			warnForDuplicates: false
		}),
		short,
		assets,
		cssnano
	]

	return gulp.src('./src/**/*.css')
		.pipe(postcss(processors))
		.pipe(rename('bundel.min.css'))
		.pipe(gulp.dest('./static/'));
});

gulp.task('assets', () => {
	gulp.src(['./src/logIn/assets/**.*', '!*.svg'])
		.pipe(gulp.dest('./static/assets'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
    	open: false,
        server: {
            baseDir: "./static/"
        }
    });
});

gulp.task('fonts', () => {
	gulp.src('./src/fonts/**/*')
		.pipe(gulp.dest('./static/fonts/'))
});

gulp.watch('./src/**/*').on('change', browserSync.reload);
gulp.watch('./src/**/*.css').on('change', () => { gulp.run('styles'); });
gulp.watch('./src/**/*.hbs').on('change', () => { gulp.run('compile'); });