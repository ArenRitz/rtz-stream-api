var express = require('express');
var router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/video')
  },
  filename: function (req, file, cb) {
      cb(null,  uuidv4() + '.mp4'  )
  },
})
const upload = multer({ storage: storage })



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/upload', upload.single('rtzvid'), (req, res) => {
  console.log(`Video uploaded: ${req.file.filename}`)
  })


module.exports = router;
