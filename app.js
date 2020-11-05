/** node_modules ********************************/
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { upload } = require('./modules/multer-conn');
//const upload = multer({ dest: path.join(__dirname, './uploads/') });


/** modules ********************************/
// const logger = require('./modules/morgan-conn');
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
// app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));


/** routers ********************************/
app.get('/test/upload', (req, res, next) => {
	res.render('test/upload');
});

app.post('/test/save', upload.single("upfile"), (req, res, next) => {
	res.json(req.body);
});
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/storage', express.static(path.join(__dirname,"./uploads")));
app.use('/board', boardRouter);
app.use('/gallery', galleryRouter);


/** error ********************************/
app.use((req, res, next) => {
	const err = new Error();
	err.code = 404;
	err.msg = '요청하신 페이지를 찾을 수 없습니다.';
	next(err);
});

app.use((err, req, res, next) => {
	console.log(err);
	const code = err.code || 500;
	const msg = err.msg || '서버 내부 오류입니다. 관리자에게 문의하세요.';
	res.render('./error.pug', { code, msg });
});