/**
 * my gulp file
 * @author chen
 * @email chen.orange@aliyun.com
 * @website http://findchen.com
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var del = require('del');

/** sass **/
gulp.task('sass', function(){
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('docs/css'))
        .pipe(browserSync.reload({stream:true}));
});

/** js **/
gulp.task('js', function(){
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('docs/js'))
        .pipe(browserSync.reload({stream:true}));
});

/** compress js **/
gulp.task('dist-js', function(){
  return gulp.src('src/js/*.js')
    .pipe(concat('juss.js'))
    .pipe(gulp.dest('./dist/'))
});
gulp.task('compress-js', function(){
  return gulp.src('src/js/*.js')
    .pipe(concat('juss.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});
gulp.task('dist-css', function(){
  return gulp.src('src/css/juss.css')
    .pipe(gulp.dest('./dist/'))
});
gulp.task('compress-css', function(){
  return gulp.src('src/css/juss.css')
    .pipe(concat('juss.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist'))
});
gulp.task('dist-clean', function(){
    return del.sync('dist');
});


/** images **/
gulp.task('images', function(){
    return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('docs/img'));
});

/** fonts **/
gulp.task('fonts', function(){
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('docs/fonts'));
});

/** clean for build **/
gulp.task('clean', function(){
    return del.sync('docs');
});


/** useref **/
gulp.task('useref', function(){
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('docs'));
});

/** nunjucksRender **/
gulp.task('nunjucksRender', function(){
    return gulp.src(['src/html/**/*.html'])
        .pipe(nunjucksRender({
            path: ['src/html/']
        }))
        .pipe(gulp.dest('src'))
        .pipe(browserSync.reload({stream:true}));
});

/** browserSync **/
gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
});

/** copy CNAME to docs **/
gulp.task('cname', function(){
    return gulp.src('CNAME')
        .pipe(gulp.dest('docs'));
});

/** default **/
gulp.task('default', ['sass', 'js', 'nunjucksRender', 'browserSync'], function(){
    console.log('Hello Chen');
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/html/**/*.html', ['nunjucksRender']);
});

/** build docs **/
gulp.task('docs', ['clean', 'sass', 'js', 'nunjucksRender', 'fonts', 'images', 'useref', 'cname'], function(){
    console.log('Building docs...');
});

/** build dist **/
gulp.task('build', ['dist-clean', 'dist-css','compress-css','dist-js','compress-js'], function(){
    console.log('Building dist...');
})
