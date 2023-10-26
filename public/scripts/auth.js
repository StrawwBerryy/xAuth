const express = require('express');
const app = express();
const input = document.getElementsByClassName('fileinput');

require('dotenv').config();

function toggleInput(){
    if(process.env.isloggedin == 'true'){
        input.style.display = 'none';
    } else {
        next();
    }
};