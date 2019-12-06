const {src,dest,parallel,watch}=require("gulp");
const autoprefixer=require("gulp-autoprefixer");
const clean=require("gulp-clean-css ");


function style(){
  return src("./src/css/**/*.css")
  .pipe(autoprefixer({
    browsers:['last 3 versions']

  }))
  .pipe(clean())
  .pipe(dest("./dest/css/"))
}
