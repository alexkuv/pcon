import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = () => {
  return app.gulp.src(app.path.src.img)
    .pipe(app.plugins.newer(app.path.build.img))
    .pipe(app.plugins.if(
      app.isBuild,
      webp()
    ))
    .pipe(app.plugins.if(
      app.isBuild,
      app.gulp.dest(app.path.build.img)
    ))
    .pipe(app.plugins.if(
      app.isBuild,
      app.gulp.src(app.path.src.img)
    ))
    .pipe(app.plugins.if(
      app.isBuild,
      app.plugins.newer(app.path.build.img)
    ))
    .pipe(app.plugins.if(
      app.isBuild,
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3
      })
    ))
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.gulp.src(app.path.src.fav)) 
    .pipe(app.gulp.dest(app.path.build.fav))
    .pipe(app.plugins.browserSync.stream())
}