

const express = require('express');
const config = require('./config/config');;

const app = express();

require('./config/express')(app, config);
// Get cloudinary environment configuration
require('./config/env')(app);


app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});

