const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('main');
});

app.listen(3000, process.env.PORT, process.env.IP, ()=>{
    console.log('Local server started on PORT: 3000')
});