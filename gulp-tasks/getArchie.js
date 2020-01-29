var fs = require('fs');
var Gootenberg = require('gootenberg');

module.exports = function(credentials, token, config) {
  return async function getArchie() {
    const goot = new Gootenberg();
    await goot.auth.oauth(credentials, token);

    await Promise.all(
      Object.keys(config.archie).map(async p => {
        console.log(config.archie[p]);
        const data = await goot.parse.archie(config.archie[p]);
        if (!fs.existsSync('app/data')) {
          fs.mkdirSync('app/data');
        }
        fs.writeFile(
          `app/data/${p
            .split('_')
            .slice(0, -1)
            .join('_')}.json`,
          JSON.stringify(data, null, '  '),
          function(err) {
            console.log(
              'Completed ' +
                p
                  .split('_')
                  .slice(0, -1)
                  .join('_') +
                '.json'
            );
            if (err) {
              console.log(
                'Unable to write file: ' +
                  p
                    .split('_')
                    .slice(0, -1)
                    .join('_') +
                  '.json'
              );
            }
          }
        );
      })
    );
  };
};
