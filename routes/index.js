var express = require('express');
var router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.DIR);
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '.mp4')
  },
})
const upload = multer({ storage: storage })



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/upload', upload.single('rtzvid'), (req, res) => {
  console.log(`Video uploaded: ${req.file.filename.substring(0, req.file.filename.lastIndexOf('.')) || req.file.filename}`)
  
});

router.get('/:id', (req, res) => {
  const path = process.env.DIR + '/' + req.params.id + '.mp4';
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const head = {
    'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
  }
  res.writeHead(200, head)
  fs.createReadStream(path).pipe(res)


});

module.exports = router;
