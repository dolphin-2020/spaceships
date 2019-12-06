const {src,dest,parallel,watch}=require("gulp");
const autoprefixer=require("gulp-autoprefixer");
const clean=require("gulp-clean-css");
const img=require("gulp-imagemin");
const babel=require("gulp-babel");
const concat=require("gulp-concat");
const uglify =require("gulp-uglify");

function style(){
  return src("./src/css/**/*.css")
  .pipe(autoprefixer({
    browsers:['last 3 versions']

  }))
  .pipe(clean())
  .pipe(dest("./dest/css/"))
}
 
function imgs(){
  return src("./src/images/**/")
  .pipe(img())
  .pipe(dest("./dest/images/"))
}

function js(){
  return src(['./src/js/resources.js','./src/js/app.js','./src/js/engine.js'])
  .pipe(babel({
    presets: [
      ['@babel/preset-env', {modules: false}]
]
  }))
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(dest('./dest/js'))
}

function cpHtml(){
  return src('./src/**/*.html')
  .pipe(dest('./dest/'))
}

function watcher () {
  watch('./src/css/**/*.scss', style)
  watch('./src/js/**/*.js',js)
  watch('src/**/*.html',cpHtml)
  watch('./src/images/',imgs)
}

exports.all=parallel(style,cpHtml,imgs,js,watcher);
