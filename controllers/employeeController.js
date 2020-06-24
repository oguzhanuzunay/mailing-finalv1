const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
  res.render('adminPage/addOrEdit', {
    viewTitle: 'Insert User',
  });
});

router.post('/', (req, res) => {
  if (req.body._id == '') insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  var employee = new Employee();
  employee.userName = req.body.userName;
  employee.password = req.body.password;
  employee.type = req.body.type;
  employee.email = req.body.email;
  employee.save((err, doc) => {
    if (!err) res.redirect('adminPage/list');
    else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('adminPage/addOrEdit', {
          viewTitle: 'Insert User',
          employee: req.body,
        });
      } else console.log('Error during record insertion : ' + err);
    }
  });
}

function updateRecord(req, res) {
  Employee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect('adminPage/list');
      } else {
        if (err.name == 'ValidationError') {
          handleValidationError(err, req.body);
          res.render('adminPage/addOrEdit', {
            viewTitle: 'Update User',
            employee: req.body,
          });
        } else console.log('Error during record update : ' + err);
      }
    }
  );
}

router.get('/list', (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.render('adminPage/list', {
        list: docs,
      });
    } else {
      console.log('Error in retrieving User list :' + err);
    }
  }).lean();
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case 'userName':
        body['userNameError'] = err.errors[field].message;
        break;
      case 'password':
        body['passwordError'] = err.errors[field].message;
        break;
        case 'type':
        body['typeError'] = err.errors[field].message;
        break;
        case 'email':
        body['emailError'] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get('/:id', (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render('adminPage/addOrEdit', {
        viewTitle: 'Update User',
        employee: doc,
      });
    }
  });
});

router.get('/delete/:id', (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/adminPage/list');
    } else {
      console.log('Error in User delete :' + err);
    }
  });
});

module.exports = router;
