var express = require('express');
var cors = require('cors');
const multer = require('multer')
const fs = require('fs')
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

var app = express();
const upload = multer({dest: 'uploads/'})

app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/fileanalyse', (req, res) => {
  res.send('not found');
})

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.send('upload file is required.')
  }
  const newJson = {...{
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }}
  try {
    fs.unlinkSync(req.file.path)
    //file removed
  } catch(err) {
    console.error(err)
  }
  res.json(newJson)
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
