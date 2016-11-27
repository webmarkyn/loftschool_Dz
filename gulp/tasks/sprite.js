'use strict';

module.exports = function() {
  $.gulp.task('sprite', function() {
    var spriteData = $.gulp.src('./source/images/*.png').pipe($.gp.spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        imgPath: '/assets/img/sprite.png'
    }));
    return spriteData.pipe($.gulp.dest('./source/sprites/'));
  })
};
