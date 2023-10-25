const express = require('express');
const app = express();

const user = 'cyberrodeo';
const pass = '123123';

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

var auth = require('./scripts/auth');


app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.static('public'));

function isLoggedin(req, res, next){
    if(auth == false){
        res.redirect('/');
        console.log('the value of the variable is false bruh')
    } else {
        next();
    }
}

app.get('/', (req, res)=>{
    res.render('main');
});

console.log('default auth variable = ' + auth);

// function isLoggedin(){
//     console.log('is the user loggedd in?' + auth);
// };



app.post('/', (req, res)=>{
    if(req.body.user == user && req.body.pass == pass){
        console.log('verified!');
        res.redirect('/secret');
        auth = true;
        console.log(auth);
    } else {
        res.redirect('/');
        console.log("not verified " + auth);
    }
});

app.get('/secret', isLoggedin, (req, res)=>{
    res.render('secretpage');
});




app.listen(3000, process.env.PORT, process.env.IP, ()=>{
    console.log('Local server started on PORT: 3000')
});