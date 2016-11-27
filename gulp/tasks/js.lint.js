'use strict';

module.exports = function() {
  $.gulp.task('js:lint', function() {
    return $.gulp.src($.path.app)
      .pipe($.gp.eslint({
          "extends": [
              ".eslintrc"
          ]
      }))
      .pipe($.gp.eslint.format());
  })
};
