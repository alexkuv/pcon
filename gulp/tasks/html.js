import fileinclude from "gulp-file-include";
import versionNumber from "gulp-version-number";
import webpHtmlNoNvg from '../libs/webpHtmlNoSvg.js'

export const html = () => {
  return app.gulp.src(app.path.src.html)
    .pipe(fileinclude())
    .pipe(app.plugins.if(
      app.isBuild,
      versionNumber({
        'value': '%DT%',
        'append': {
          'key': '_v',
          'cover': 0,
          'to': [
            'css',
            'js',
          ]
        },
        'output': {
          'file': 'gulp/version.json'
        }
      }))
    )
    .pipe(app.plugins.if(
      app.isBuild,
      webpHtmlNoNvg()
    ))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream())
}