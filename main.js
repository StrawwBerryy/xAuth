const express = require('express');
const app = express();

const user = 'cyberrodeo';
const pass = '123123';

const middleware = require('./middleware/index');

const bodyParser = require('body-parser');
const middlewareobj = require("./middleware");
app.use(bodyParser.urlencoded({extended : true}));


require('dotenv').config();

// function isLoggedin(req, res, next){
//     if(process.env.isLoggedin == 'false'){
//         res.redirect('/');
//         console.log('the value of the variable is false bruh')
//     } else {
//         console.log('middleware in secret pages route has verified it!')
//         next();
//     }
// }

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('main', {err:'yo yo yo'});
});

console.log('default auth variable = ' + process.env.isLoggedin);

app.post('/', (req, res)=>{
    if(req.body.user == user && req.body.pass == pass){
        console.log('verified!');
        res.redirect('/secret');
        process.env.isLoggedin = 'true';
        console.log(process.env.isLoggedin);
    } else {
        res.redirect('/', {error: 'password is incorrect!'});
        console.log("not verified " + process.env.isLoggedin);
    }
});

app.get('/secret', middlewareobj.authMiddleware, (req, res)=>{
    res.render('secretpage');
});
// app.get('/secret', isLoggedin, (req, res)=>{
//     res.render('secretpage');
// });

app.get('/testing', middlewareobj.authMiddleware, (req, res)=>{
    res.send("this is the testing page!")
});


// app.get('/logout', (req, res)=>{
    
// });

// app.post('/logout', (req, res) =>{
//     process.env.isLoggedin = false;
// });



app.listen(3000, process.env.PORT, process.env.IP, ()=>{
    console.log('Local server started on PORT: 3000')
});