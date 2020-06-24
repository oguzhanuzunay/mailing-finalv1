const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const path = require('path');
const http = require('http');
const fs = require('fs');

router.get('/',function(req,res) {
  res.sendFile(path.join(__dirname,'/','pages/Mailing2.5.3.html'));
});


module.exports = router;