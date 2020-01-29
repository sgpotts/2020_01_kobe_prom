var fs = require('fs');

module.exports = function(gulp) {
  return function(done) {
    fs.readFile('dist/index.html', 'utf8', (err, data) => {
      if (err) throw err;
      var date = new Date()
      //console.log(date)
      var build_obj = {
        content: data,
        created_at: date.getTime()
      }
      fs.writeFile('./app/data/_build.json', JSON.stringify(build_obj), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
      done();
    });
  };
};
