require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const employeeController = require('./controllers/employeeController');
const loginController = require('./controllers/loginController');
const toolController = require('./controllers/toolController');



var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/adminPage', employeeController);
app.use('/login',loginController);
app.use('/',loginController);
app.use('/tool',toolController);
app.use((req,res)=> {
  res.status(404).sendFile(path.join(__dirname,'/controllers','pages/404-Page.html'));
})