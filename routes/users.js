// routes/users.js
const express = require('express');
const router = express.Router();
require('dotenv').config();



module.exports = (db) => {
  // all routes will go here 
  router.post('/upload', upload.single('rtzvid'), (req, res) => {
    console.log(`Video uploaded: ${req.file.filename.substring(0, req.file.filename.lastIndexOf('.')) || req.file.filename}`)
    // make post request to db
    
    
  });

  return router;
}