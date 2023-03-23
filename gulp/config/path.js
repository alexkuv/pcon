import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = './dist';
const srcFolder = './src';

export const path = {
  build: {
    html: `${buildFolder}/`,
    styles: `${buildFolder}/styles`,
    scripts: `${buildFolder}/scripts`,
    img: `${buildFolder}/images`,
    fav: `${buildFolder}/images/favicon/`,
    fonts: `${buildFolder}/fonts`,
    libsCss: `${buildFolder}/libs/css`,
    libsJs: `${buildFolder}/libs/js`,
  },
  src: {
    html: `${srcFolder}/pages/*.html`,
    components: `${srcFolder}/components/index.js`,
    img: [`${srcFolder}/images/**/*.+(jpg|jpeg|png|webp|gif)`, `!${srcFolder}/images/favicon/*`],
    fav: `${srcFolder}/images/favicon/*.+(ico|png)`,
    svg: `${srcFolder}/images/**/*.svg`,
    libsCss: `${srcFolder}/libs/css/*.css`,
    libsJs: `${srcFolder}/libs/js/*.js`,
  },
  watch: {
    html: `${srcFolder}/pages/**/*.html`,
    styles: `${srcFolder}/components/**/*.scss`,
    scripts: `${srcFolder}/components/**/*.js`,
    img: [`${srcFolder}/images/**/*.+(jpg|jpeg|png|webp|gif|svg)`, `!${srcFolder}/images/favicon/*`],
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder
};