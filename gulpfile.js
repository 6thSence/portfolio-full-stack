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
const concat = require('gulp-concat');
const reporter = require('postcss-browser-reporter');

gulp.task('default', ['compile',
	'styles',
	'browser-sync',
	'assets',
	'fonts',
	'scripts'
]);

gulp.task('compile', () => {
	options = {
		batch : ['./src/partials']
		}

	gulp.src('src/logIn/*.hbs')
		.pipe(handlebars(templateData, options))
		.pipe(rename('logIn.html'))
		.pipe(gulp.dest('./static'));

	gulp.src('src/blog/*.hbs')
		.pipe(handlebars(templateData, options))
		.pipe(rename('blog.html'))
		.pipe(gulp.dest('./static'));

	gulp.src('src/aboutMe/*.hbs')
		.pipe(handlebars(templateData, options))
		.pipe(rename('aboutMe.html'))
		.pipe(gulp.dest('./static'));

	gulp.src('src/works/*.hbs')
		.pipe(handlebars(templateData, options))
		.pipe(rename('works.html'))
		.pipe(gulp.dest('./static'));
});

gulp.task('styles', () => {
	const processors = [
		cssnext({
			warnForDuplicates: false
		}),
		short,
		assets,
		cssnano,
		reporter
	]

	return gulp.src('./src/**/*/*.css')
		.pipe(postcss(processors))
		.pipe(concat('bundel.min.css'))
		.pipe(gulp.dest('./static/'));
});

gulp.task('assets', () => {
	return gulp.src(['./src/logIn/assets/**.*',
	 './src/blog/assets/**.*',
	 './src/aboutMe/assets/**.*',
	 './src/works/assets/**.*',
	 '!./src/**/*.svg'])
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

gulp.task('scripts', () => {
	return gulp.src('src/**/*.js')
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('./static'));
});

gulp.task('fonts', () => {
	return gulp.src('./src/fonts/**/*')
		.pipe(gulp.dest('./static/fonts/'));
});

gulp.watch('./src/**/*').on('change', browserSync.reload);
gulp.watch('./src/**/*.css').on('change', () => { gulp.run('styles'); });
gulp.watch('./src/**/*.hbs').on('change', () => { gulp.run('compile'); });
gulp.watch('./src/**/*.js').on('change', () => { gulp.run('scripts'); });