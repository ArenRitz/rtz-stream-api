// routes/users.js
const express = require('express');
const router = express.Router();
const users = require('../db/queries/users');
require('dotenv').config();
var fs = require('fs');


/* GET users listing. */
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