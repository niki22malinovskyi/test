let gulp = require('gulp'),
	scss = require('gulp-sass'),
	browserSync = require('browser-sync'),
	uglifyjs = require('gulp-uglifyjs'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	autoprefixer = require("gulp-autoprefixer"),
	del = require('del');

	gulp.task('clean',async function(){
		del.sync('dist')
	});



	gulp.task("scss", function(){
		return gulp
		.src('app/scss/**/*.scss')
		.pipe(scss({outputStyle: 'compressed'}))
		.pipe(
			autoprefixer({
				overrideBrowserslist:  ['last 2 versions']
			})
			)
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
	});




	gulp.task("html", function(){
		return gulp.src("app/*.html")
		.pipe(browserSync.stream());
	});

	gulp.task("browser-sync", function(done){
		browserSync.init({
			server : {
				baseDir : "app"
			}
		});
		done();
	});



	gulp.task("js", function(){
		return gulp 
			.src([
					"node_modules/jquery/dist/jquery.js",
					"node_modules/slick-carousel/slick/slick.js",
				])
			.pipe(concat("libs.min.js"))
			.pipe(uglifyjs())
			.pipe(gulp.dest("app/js"))
			.pipe(browserSync.stream())
	});


	gulp.task('export', function(){
		let buildHtml = gulp.src('app/**/*.html')
			.pipe(gulp.dest('dist'))

		let buildCss = gulp.src('app/css/**/*.css')
			.pipe(gulp.dest('dist/css'))

		let buildJs = gulp.src('app/js/**/*.js')
			.pipe(gulp.dest('dist/js'))

		let buildFonts = gulp.src('app/fonts/**/*.*')
			.pipe(gulp.dest('dist/fonts'))

		let buildImg = gulp.src('app/img/**/*.*')
			.pipe(gulp.dest('dist/img'))
	});





	gulp.task("watch", function(done){
		gulp.watch("app/scss/**/*.scss", gulp.parallel("scss"));
		gulp.watch("app/js/main.js", gulp.parallel("js"));
		gulp.watch("app/*.html", gulp.parallel("html"));
		done();
	});

	gulp.task('build', gulp.series('clean', 'export'));

	gulp.task("default", gulp.series("watch", "scss", "js", "browser-sync"));

	