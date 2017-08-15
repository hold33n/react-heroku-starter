const path = require('path');
const webpack = require('webpack');
const express = require('express');
const http = require('http');
const config = require('./webpack-prod.config');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const compiler = webpack(config);
const compression = require('compression');

app.use(compression()); //use compression for gzip

function static(dirname, age) {
  return express.static(path.join(__dirname, dirname), { maxAge: age });
}

app.use('/static/', static('/static/', 31557600000));
app.use('/static/public/', static('/static/public/', 31557600000));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, config.output.publicPath));
});


server.listen(port, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at port: ', port);
});
