/** node_modules ********************************/
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const createError= require('http-errors');

/** modules ********************************/
const logger = require('./modules/morgan-conn');
const boardRouter = require('./routes/board');
const galleryRouter = require('./routes/gallery');

/** Initialize ********************************/
app.listen(process.env.PORT, () => {
	console.log( `http://127.0.0.1:${process.env.PORT}` );
});

/** Initialize ********************************/
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.locals.pretty = true;

/** middleware ********************************/
app.use(logger);

//app.use((req, res, next) =>{express.json()(req,res, next);});
app.use(express.json());
app.use(express.urlencoded({extended: false}));


/** routers ********************************/
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/storage', express.static(path.join(__dirname, './uploads')));
app.use('/board', boardRouter);
app.use('/gallery', galleryRouter);


/** error ********************************/
app.use((req, res, next) => {
	/* const err = new Error();
	err.code = 404;
	err.msg = ; */
	next(createError(404,'요청하신 페이지를 찾을 수 없습니다.'));
});

app.use((err, req, res, next) => {
	/* let msg=''; */
	//console.log(err);
	const code = err.status || 500;
	const message = err.status == 404 ? '페이지를 찾을 수 없습니다.':' 서버 내부 오류 입니다. 관리자에게 문의하세요.';
/* 	if(process.env.SERVICE !=='production'){
		msg =err.msg || message;
	}
	else{
		msg=message;
	} */
	let msg = process.env.SERVICE !=='production'? err.msg || message : message;
	/* const msg = err.message && process.env.SERVICE !=='production'? err.message : '서버 내부 오류입니다. 관리자에게 문의하세요.';
	 */res.render('./error.pug', { code, msg });
});