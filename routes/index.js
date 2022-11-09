var express = require('express');
var router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { newVideo, updateTitle, getAllUids } = require('../db/queries/upload');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.DIR);
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '.mp4')
  },
})
const upload = multer({ storage: storage }).single('rtzvid');



/* GET home page. */
router.get('/videos', function (req, res) {
  getAllUids().then(data => {
    res.json(data);
  })

});


router.post('/upload', (req, res) => {
  req.setTimeout(2000000);

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err)
    } else if (err) {
      console.log(err);
      return res.status(500).json(err)
    }
    console.log(`Video uploaded: ${req.file.filename.substring(0, req.file.filename.lastIndexOf('.')) || req.file.filename}`)
    newVideo(req.file.filename).then(data => {
      res.json(data);
    })
  })
});



  // make post request to db



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
