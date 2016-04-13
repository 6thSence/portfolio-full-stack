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


gulp.task('default', ['compile', 'styles', 'browser-sync']);

gulp.task('compile', () => {
	options = {
		batch : ['./login/partials']
		}

	return gulp.src('login/*.hbs')
		.pipe(handlebars(templateData, options))
		.pipe(rename('login.html'))
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

	return gulp.src('./login/**/*.css')
		.pipe(postcss(processors))
		.pipe(rename('bundel.min.css'))
		.pipe(gulp.dest('./static/'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./static/"
        }
    });
});


gulp.watch('./login/**/*').on('change', browserSync.reload);
gulp.watch('./login/**/*.css').on('change', () => { gulp.run('styles'); });
gulp.watch('./login/**/*.hbs').on('change', () => { gulp.run('compile'); });