require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const createError= require('http-errors');
const { upload } = require('./modules/multer-conn');

app.listen(process.env.PORT, () => {
	console.log( `http://127.0.0.1:${process.env.PORT}` );
});

const first = (req, res, next)=>{

    console.log('FIRST');
    next();
}
const third = (value) =>{
    return (req, res, next) =>{
        console.log(value);
        next();
    }
   
}
app.get('/', third('THIRD'), (req, res, next) => {
	console.log('SECOND');
	res.send('<h1>Hello</h1>');
});

/* app.get('/',first,(req, res, next)=>{
    console.log('second');
    console.log(req.test);
    req.test2='second';
    next();
},(req, res, next)=>{
    console.log('third');
    console.log(req.test2);
    res.send(`<h1>hello~~~</h1>`);
}); */