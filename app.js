const { body,validationResult } = require('express-validator');


var express = require('express');
var app = express();

app.use(express.static('public'));

// This responds with "Hello World" on the homepage
app.get('/index', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "/templates/" + "index.html" );
})


app.get('/donateus', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "/templates/" + "donateus.html" );
})


app.post('/donateus', function (req, res) {
  const username = req.params.username
  console.log("Got a POST request for the homepage"+username);
  res.end()
})



var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
