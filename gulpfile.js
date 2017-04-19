var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

// Static Server + watching sass/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("sass/**/*.scss", ['sass']);
    gulp.watch("**/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("sass/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
          browsers: ['last 3 versions'],
          cascade: false
        }))
        // .pipe(cleanCSS({debug: true}, function(details) {
        //         console.log(details.stats.originalSize);
        //         console.log(details.stats.minifiedSize);
        //     }))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
