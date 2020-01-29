var nunjucksRender = require('gulp-nunjucks-html');
var data = require('gulp-data');
var config = require('../config.json');
var fs = require('fs');
var marked = require('marked');

module.exports = function(gulp, browserSync) {
  return function nunjucksRenderTask(cb) {
    gulp
      .src('app/**/*.html')
      .pipe(
        data(function() {
          var site = {};
          Object.keys(config).map(k => {
            Object.keys(config[k]).map(c => {
              if (fs.existsSync('app/data/' + c.split('_')[0] + '.json')) {
                site[c.split('_')[0]] = require('../app/data/' +
                  c.split('_')[0] +
                  '.json');
              }
            });
          });
          return { site: site, tags: require('../app/data/tags.json') };
        })
      )
      .on('error', function(err) {
        console.log(err);
      })
      .pipe(
        nunjucksRender({
          searchPaths: ['app/templates'],

          setUp: function(env) {
            env.addFilter('md', function(text) {
              return marked.inlineLexer(text, []);
            });
            return env;
          },
        })
      )
      .on('error', function(err) {
        console.log(err);
        // err is the error thrown by the Nunjucks compiler.
      })
      .pipe(gulp.dest('.tmp'))
      .pipe(
        browserSync.reload({
          stream: true,
        })
      );
    cb();
  };
};
