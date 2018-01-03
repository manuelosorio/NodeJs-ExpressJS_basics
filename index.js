var express = require ("express");
var path = require('path');
var app = express();

var routes = require('./_lesson/1-routes');

app.set('port', (process.env.PORT || 3000))

app.use('/1-routes', routes);

//load static files
app.use('/app', express.static('public'));

//404 Error loades file to corrent page
app.use( (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '_status-errors', '404.html'));
  console.log("404 Error - User tried to reach a page that might not exist");
});


app.listen(app.get('port'), () => {
  console.log('App running on port ', app.get('port'));
});
