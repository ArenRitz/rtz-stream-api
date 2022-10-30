var express = require('express');
var router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/video')
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
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
