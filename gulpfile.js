import gulp from "gulp";

/* configs */
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

/* global variable */
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

/* tasks */
import { reset } from "./gulp/tasks/del.js";
import { html } from "./gulp/tasks/html.js";
import { components } from "./gulp/tasks/components.js";
import { images } from "./gulp/tasks/images.js";
import { server } from "./gulp/tasks/server.js";
import { copyLibsCss, copyLibsJs } from "./gulp/tasks/copyLibs.js";

function watcher() {
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.styles, components);
    gulp.watch(path.watch.scripts, components);
    gulp.watch(path.watch.img, images);
}

const mainTastk = gulp.series(gulp.parallel(html, components, copyLibsCss, copyLibsJs, images));


const dev = gulp.series(reset, mainTastk, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTastk);

export { dev };
export { build };

gulp.task('default', dev);