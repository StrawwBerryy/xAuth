const express = require('express');

require('dotenv').config();

var middlewareobj = {};

middlewareobj.authMiddleware = function(req, res, next){
    if(process.env.isLoggedin == 'false'){
        res.redirect('/');
        console.log('the value of the variable is false bruh')
    } else {
        next();
    }
}

module.exports = middlewareobj;