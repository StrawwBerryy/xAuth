const express = require('express');
const app = express();

const user = 'cyberrodeo';
const pass = '123123';

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

let Isloggedin = false;

function isLoggedin(req, res, next){
    if(Isloggedin == false){
        res.redirect('/');
        console.log('the value of the variable is false bruh')
    } else {
        console.log('logged in!');
    }
}

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('main');
});

app.post('/', (req, res)=>{
    if(req.body.user == user && req.body.pass == pass){
        console.log('verified!');
        res.redirect('/secret');
        let Isloggedin = true;
        console.log(Isloggedin);
    } else {
        res.redirect('/');
        console.log("not verified" + Isloggedin);
    }
});

app.get('/secret', isLoggedin, (req, res)=>{
    res.render('secretpage');
});




app.listen(3000, process.env.PORT, process.env.IP, ()=>{
    console.log('Local server started on PORT: 3000')
});