// routes/users.js
const express = require('express');
const router = express.Router();
require('dotenv').config();
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


module.exports = (db) => {
  // all routes will go here 
  router.post('/upload', upload.single('rtzvid'), (req, res) => {
    console.log(`Video uploaded: ${req.file.filename.substring(0, req.file.filename.lastIndexOf('.')) || req.file.filename}`)
    // make post request to db
    
    
  });

  return router;
}