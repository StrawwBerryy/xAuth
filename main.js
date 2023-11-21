const express = require('express');
const app = express();
const mongoose = require('mongoose');

const middleware = require('./middleware/index');

const bodyParser = require('body-parser');
const middlewareobj = require("./middleware");
app.use(bodyParser.urlencoded({extended : true}));

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.static('public'));

app.get('/', middlewareobj.loggedin, (req, res)=>{
    res.render('main', {err:''});
});

console.log('default auth variable = ' + process.env.isLoggedin);

app.post('/', (req, res)=>{
    if(req.body.user == process.env.user && req.body.pass == process.env.pass){
        console.log('verified!');
        res.redirect('/secret');
        process.env.isLoggedin = 'true';
        console.log(process.env.isLoggedin);
    } else {
        res.redirect('/');
        console.log("not verified " + process.env.isLoggedin);
    }
});

app.get('/secret', middlewareobj.authMiddleware, (req, res)=>{
    res.render('secretpage');
});

app.get('/testing', middlewareobj.loggedin, (req, res)=>{
    res.send("this is the testing page!");
});

app.listen(3000, process.env.PORT, process.env.IP, ()=>{
    console.log('Local server started on PORT: 3000')
});