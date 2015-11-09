import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import rimraf from 'rimraf';
import notify from 'gulp-notify';
import browserSync, { reload } from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
//import sass from 'gulp-sass';
import sass from 'gulp-ruby-sass';
import bower from 'gulp-bower';
import nested from 'postcss-nested';
import vars from 'postcss-simple-vars';
import extend from 'postcss-simple-extend';
import cssnano from 'cssnano';
import htmlReplace from 'gulp-html-replace';
import image from 'gulp-image';
import runSequence from 'run-sequence';
import nodemon from 'gulp-nodemon';

const paths = {
  bundle: 'app.js',
  srcJsx: 'src/client.js',
  srcCss: 'src/**/*.scss',
  srcImg: 'src/images/**',
  dist: 'dist',
  distJs: 'dist/js',
  distImg: 'dist/images',
  distCss: 'dist/css',
  styleDir: './src/styles',
  sassMain: 'main.scss',
  bowerDir: './bower_components'
};

const REFRESHDELAY = 5000;

gulp.task('clean', cb => {
  rimraf('dist', cb);
});

gulp.task('browserSync', () => {
  browserSync({
    proxy:"localhost:8080"
  });
});

gulp.task('watchify', () => {
  let bundler = watchify(browserify(paths.srcJsx, watchify.args));

  function rebundle() {
    bundler
      .bundle()
      .on('error', notify.onError())
      .pipe(source(paths.bundle))
      .pipe(gulp.dest(paths.distJs))
      .pipe(reload({stream: true}));
      return bundler;
  }

  bundler.transform(babelify)
  .on('update', rebundle);
  return rebundle();
});



gulp.task('browserify', () => {
  browserify(paths.srcJsx)
  .transform(babelify)
  .bundle()
  .pipe(source(paths.bundle))
  .pipe(buffer())
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.distJs));
});

gulp.task('styles', () => {
    return sass(paths.styleDir + '/' + paths.sassMain,{
         style: 'compressed',
         loadPath: [
             paths.styleDir,
             paths.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
             paths.bowerDir + '/fontawesome/scss',
         ]
     })
        .on("error", notify.onError(function (error) {
             return "Error: " + error.message;
         }))
     .pipe(gulp.dest(paths.distCss));
  /*gulp.src(paths.srcCss)
  .pipe(sourcemaps.init())
  .pipe(postcss([vars, extend, nested, autoprefixer, cssnano]))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.dist))
  .pipe(reload({stream: true}));*/
});

gulp.task('htmlReplace', () => {
  gulp.src('index.html')
  .pipe(htmlReplace({css: 'styles/main.css', js: 'js/app.js'}))
  .pipe(gulp.dest(paths.dist));
});

gulp.task('images', () => {
  gulp.src(paths.srcImg)
  .pipe(image())
  .pipe(gulp.dest(paths.distImg));
});

gulp.task('lint', () => {
  gulp.src(paths.srcJsx)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(paths.bowerDir));
});

gulp.task('icons', function() {
    return gulp.src(paths.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest(paths.dist + '/fonts'));
});

gulp.task('watchServ',() => {
    return nodemon({
        script: 'main.js',
        watch:['src/**/*.js','views/**/.*', 'main.js'],
        env: { 'NODE_ENV': 'development' }
    }).on('restart', function () {
      setTimeout(() => {
          reload({ stream:false});
      }, REFRESHDELAY);
    })
});


gulp.task('watchTask', () => {
  gulp.watch(paths.srcCss, ['styles']);
  gulp.watch(paths.srcJsx, ['lint']);
});

gulp.task('watch', cb => {
  runSequence('clean', ['browserSync', 'watchServ', 'watchTask', 'watchify', 'styles', 'lint', 'images'], cb);
});

gulp.task('build', cb => {
  process.env.NODE_ENV = 'production';
  runSequence('clean', ['bower', 'browserify', 'styles', 'htmlReplace', 'images'], cb);
});
