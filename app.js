const { body,validationResult } = require('express-validator');


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var fs = require('fs');
var dateTime = require('node-datetime');


var dt = dateTime.create();
var todayDate = dt.format('Y_m_d');
console.log("Today is "+todayDate+" We Hope You Have A Nice Day Ahead!!");


app.use(express.static('public'));


app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));


app.get('/index', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "/templates/" + "index.html" );
})

app.get('/livemap', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "/templates/" + "livemaps.html" );
})

app.get('/donateus', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "/templates/" + "donateus.html" );
})

app.get('/fragment_intro', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "/templates/" + "fragment_intro.html" );
})

app.get('/fragment_anaylysis', function (req, res) {
   console.log("Got a GET request for the fragment_anaylysis");
   res.sendFile( __dirname + "/templates/" + "fragment_anaylsis.html" );
})

app.get('/fragment_shop', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "/templates/" + "fragment_shop.html" );
})

app.post('/donateus', function (req, res) {
  const errors = validationResult(req);

    if (errors.isEmpty()) {
      const file = __dirname + "/records/jsons/recordUserDonations_"+todayDate+".json";
      const obj = req.body;
      console.log(req.body);

      fs.readFile(file, (err, data) => {
    if (err && err.code === "ENOENT") {
        // But the file might not yet exist.  If so, just write the object and bail
        return fs.writeFile(file, JSON.stringify([obj],null,4), error => console.error);
    }
    else if (err) {
        // Some other error
        console.error(err);
    }
    // 2. Otherwise, get its JSON content
    else {
        try {
            const fileData = JSON.parse(data);

            // 3. Append the object you want
            fileData.push(obj);

            //4. Write the file back out
            return fs.writeFile(file, JSON.stringify(fileData,null,4), error => console.error)
        } catch(exception) {
            console.error(exception);
        }
    }
});


    }
    else {
        console.log("Theres some error in program!!");
    }


  res.end()
})



var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
