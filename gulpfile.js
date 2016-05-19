var gulp = require('gulp');
var server = require("gulp-server-livereload");
var sass = require("gulp-sass");
var prefix = require('gulp-autoprefixer');
var wiredep = require('wiredep').stream;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css');
 
gulp.task('build', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('build'));
});


gulp.task('bower', function () {
  gulp.src('app/*.html')
    .pipe(wiredep({
      directory: 'app/libs'
    }))
    .pipe(gulp.dest('app'));
});



//SERVER
gulp.task('server', function(){
	gulp.src('app')
	.pipe(server({
		livereload: true,
		defaultFile: 'index.html',
		open: true
	}));
})



//STYLES
gulp.task('style', function (){
  gulp.src('app/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
			browsers: ['last 15 versions']
		}))
    .pipe(gulp.dest('app/css'));
});


gulp.task('watch', function(){
	gulp.watch('app/sass/**/*.sass', ['style']);
	gulp.watch('bower.json', ['bower']);
})

gulp.task('default', ['server', 'watch']);