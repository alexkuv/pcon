export const copyLibsCss = () => {

  return app.gulp.src(app.path.src.libsCss)
    .pipe(app.gulp.dest(app.path.build.libsCss))
  
}

export const copyLibsJs = () => {

  return app.gulp.src(app.path.src.libsJs)
    .pipe(app.gulp.dest(app.path.build.libsJs))
  
}
