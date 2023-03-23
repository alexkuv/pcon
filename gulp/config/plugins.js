import concat from 'gulp-concat';
import browserSync from 'browser-sync';
import ifPlugin from 'gulp-if';
import newer from 'gulp-newer';

export const plugins = {
  concat: concat,
  browserSync: browserSync,
  if: ifPlugin,
  newer: newer,
}