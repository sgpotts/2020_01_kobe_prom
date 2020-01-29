const removeCode = require('gulp-remove-code');
const inline = require('gulp-inline');
const htmlmin = require('gulp-htmlmin');

module.exports = function(gulp) {
    return function cleanupTask(cb) {
        gulp.src('.tmp/*.html')
        .pipe(removeCode({production: true}))
        .pipe(inline({
                base: 'dist/'
            }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            preserveLineBreaks: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true
          }))
          .pipe(gulp.dest('dist'))
        cb();
    }
};
