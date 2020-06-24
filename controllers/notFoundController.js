const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const path = require('path');
const http = require('http');
const fs = require('fs');

router.get((req,res)=> {
  res.statuss(404).sendFile(path.join(__dirname,'/','pages/404-Page.html'));
});


module.exports = router;