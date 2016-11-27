'use strict';

module.exports = function() {
  $.gulp.task('copy:sprite', function() {
    return $.gulp.src('./source/sprites/**/*.png', { since: $.gulp.lastRun('copy:sprite') })
      .pipe($.gulp.dest($.config.root + '/assets/img'));
  });
};
