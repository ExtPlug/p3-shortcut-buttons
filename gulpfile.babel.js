import gulp from 'gulp';
import babel from 'gulp-babel';
import rjs from 'requirejs';
import fs from 'fs';
import mkdirp from 'mkdirp';
import del from 'del';
import runseq from 'run-sequence';

const pluginPath = 'extplug/p3-shortcut-buttons';

gulp.task('clean-lib', cb => {
  del('lib', cb);
});

gulp.task('babel', () => {
  return gulp.src('src/**/*')
    .pipe(babel({ modules: 'amd' }))
    .pipe(gulp.dest('lib/'));
});

gulp.task('rjs', done => {
  // these paths are defined at runtime, so the r.js optimizer can't find them
  let paths = {
    // plug files, define()d by plug-modules
    plug: 'empty:',
    // extplug defines
    extplug: 'empty:',
    // plug.dj language files
    lang: 'empty:',
    // libraries used by plug.dj
    backbone: 'empty:',
    jquery: 'empty:',
    underscore: 'empty:',
    // libraries used by extplug
    meld: 'empty:',
    'plug-modules': 'empty:'
  };

  paths[pluginPath] = 'lib/';

  rjs.optimize({
    baseUrl: './',
    name: pluginPath + '/main',
    paths: paths,
    optimize: 'none',
    out(text) {
      mkdirp('build', e => {
        if (e) done(e);
        else   fs.writeFile('build/p3-shortcut-buttons.js', text, done);
      });
    }
  });
});

gulp.task('build', cb => {
  runseq('clean-lib', 'babel', 'rjs', cb);
});
