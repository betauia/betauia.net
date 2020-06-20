var ghpages = require('gh-pages');

ghpages.publish('public', (err) => {console.log(err)});