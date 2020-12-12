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

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, __dirname + "/records/images/"+file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

app.get('/index', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "/templates/" + "index.html" );
})


app.get('/donateus', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "/templates/" + "donateus.html" );
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

  let upload = multer({ storage: storage, fileFilter: imageFilter }).single('file');
  upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
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
