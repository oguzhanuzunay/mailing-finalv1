const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

const path = require('path');
const http = require('http');
const fs = require('fs');

router.get('/', (req, res) => {
  res.render(path.join(__dirname,'/','pages/index.hbs'));
});



router.post('/', (req, res,body) => {

var userName=req.body.userName;
var password=req.body.password;


Employee.findOne({userName:userName,password:password},(err,user) => {
    if(!err,user){
      var type=user.type
      console.log(user);
       if(type==='admin'){res.redirect('/adminPage');}
      else if (type==='user'){res.redirect('/tool');}
      else {
         console.log(err)
         console.log("1")
        
      }
      } 
       if (err) {
      console.log(err)
      console.log("2")

    }
    else{
      console.log("hatalı Giriş")

    }
    }
  )
})


module.exports = router;