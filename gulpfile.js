const {src,dest,parallel,watch}=require("gulp");
const autoprefixer=require("gulp-autoprefixer");
const clean=require("gulp-clean-css");
const img=require("gulp-imagemin");

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