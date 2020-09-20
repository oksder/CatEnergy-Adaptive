var gulp = require("gulp");
var sass = require ("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var htmlmin = require("gulp-htmlmin");
var csso = require("gulp-csso");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var rename = require("gulp-rename");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");

gulp.task("style", function (done) {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));

  done();
});

gulp.task("serve", gulp.series("style", function (done) {
  server.init({
    server: "build/"
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series ("style"));
  gulp.watch("source/*.html", gulp.series ("minify"))
    .on("change", server.reload);
  gulp.watch("source/**/*.js", gulp.series ("uglify"))
    .on("change", server.reload);
  gulp.watch('source/img/**/*.{png,jpg,svg}', gulp.series ("imagemin"))
    .on("change", server.reload);
  gulp.watch('source/img/**/*.{png,jpg}', gulp.series ("webp"))
    .on("change", server.reload);
  gulp.watch('source/img/**/icon-*.svg', gulp.series ("sprite"))
    .on("change", server.reload);

  done();
}));



gulp.task('minify', (done) => {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));

    done();
});

gulp.task('uglify', function (done) {
  return gulp.src('source/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest("build"));

  done();
});

gulp.task("imagemin", (done) => {
    return gulp.src('source/img/**/*.{png,jpg,svg}')
        .pipe(imagemin([
            imagemin.mozjpeg({progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('build/img'));

    done();
});

gulp.task('webp', (done) => {
  return gulp.src('source/img/**/*.{png,jpg}')
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest('build/img'));

  done();
});

gulp.task("sprite", function (done) {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inLineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));

  done();
});

gulp.task("copy", function (done) {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));

  done();
});


gulp.task("clean", function (done) {
  return del("build");

  done();
});

gulp.task("build", gulp.series("clean", "copy", gulp.parallel("style", "sprite", "imagemin", "webp", "uglify"), "minify"));
