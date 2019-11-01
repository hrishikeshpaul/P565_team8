var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
var port = process.env.PORT || 5000;

app.use(serveStatic(__dirname + "/dist/"));
app.get(/.*/, function (req, res) {
  res.sendfile(__dirname + '/dist/index.html')
})
app.listen(port);
console.log('server started '+ port);
