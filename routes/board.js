const express = require('express');
const moment = require('moment');
const router = express.Router();
const fs=require('fs-extra');
const createError = require('http-errors');
const { pool } = require('../modules/mysql-conn');
const { alert, uploadFolder} = require('../modules/util');
const {upload, allowExt , imgExt } =require('../modules/multer-conn');
const path = require('path');
const { lstat } = require('fs');

router.get(['/', '/list'], async (req, res, next) => {
	let connect, rs, sql,values, pug;

	pug = {title: '게시판 리스트', js: 'board', css: 'board'};
	try {
		const sql = 'SELECT * FROM board ORDER BY id DESC';
		const connect = await pool.getConnection();
		const rs = await connect.query(sql);
		connect.release();
		pug.lists = rs[0];
		pug.lists.forEach((v) => {
			v.wdate = moment(v.wdate).format('YYYY년 MM월 DD일');
		});
		res.render('./board/list.pug', pug);
	}
	catch(e) {
		if(connect) connect.release();
		next(createError(500,e.sqlMessage));
	}
});

router.get('/write', (req, res, next) => {
	const pug = {title: '게시글 작성', js: 'board', css: 'board'};
	res.render('./board/write.pug', pug);
});

router.post('/save', upload.single('upfile'), async (req, res, next) => {
	let connect, rs, sql,values, pug;
	try {
	let { title, content, writer } = req.body;
	let values = [title, writer, content];
	let sql = 'INSERT INTO board SET title=?, writer=?, content=?';

	if(req.allowUpload){
		if(req.allowUpload.allow){
			sql +=',savefile=?, realfile=?';
			values.push(req.file.filename);
			values.push(req.file.originalname);
			console.log(req);
		}
		else{
			res.send(alert(`${req.allowUpload.ext}은(는) 업로드 할 수 없습니다.`,'/board'));
			
		}
	}

	
	
		const connect = await pool.getConnection();
		const rs = await connect.query(sql, values);
		connect.release();
		res.redirect('/board');
	}
	catch(err) {
		if(connect) connect.release();
		next(createError(500,e.sqlMessage));
	}
});

router.get('/view/:id', async (req, res) => {
	let connect, rs, sql,values, pug;
	try {
		const pug = {title: '게시글 보기', js: 'board', css: 'board'};
		const sql = "SELECT * FROM board WHERE id=?";
		const values = [req.params.id];
		const connect = await pool.getConnection();
		const rs = await connect.query(sql, values);
		connect.release();
		pug.list = rs[0][0];
		pug.list.wdate = moment(pug.list.wdate).format('YYYY-MM-DD HH:mm:ss');
		if(pug.list.savefile){
			var ext= path.extname(pug.list.savefile).toLowerCase().replace(".","");
			if(imgExt.indexOf(ext) > -1){
				pug.list.imgSrc= `/storage/${pug.list.savefile.substr(0,6)}/${pug.list.savefile}`
			}
		}

		res.render('./board/view.pug', pug);
	}
	catch(e) {
		if(connect) connect.release();
		next(createError(500,e.sqlMessage));
	}
});

router.get('/delete/:id', async (req, res, next) => {
	try {
		const sql = "DELETE FROM board WHERE id=?";
		const values = [req.params.id];
		const connect = await pool.getConnection();
		const rs = await connect.query(sql, values);
		connect.release();
		res.send(alert('삭제되었습니다', '/board'));
	}
	catch(e) {
		if(connect) connect.release();
		next(createError(500,e.sqlMessage));
	}
});

router.get('/update/:id', async (req, res, next) => {
	try {
		const pug = {title: '게시글 수정', js: 'board', css: 'board'};
		const sql = "SELECT * FROM board WHERE id=?";
		const values = [req.params.id];
		const connect = await pool.getConnection();
		const rs = await connect.query(sql, values);
		connect.release();
		pug.list = rs[0][0];
		res.render('./board/write.pug', pug);
	}
	catch(e) {
		if(connect) connect.release();
		next(createError(500,e.sqlMessage));
	}
});

router.post('/saveUpdate',upload.single('upfile'), async (req, res, next) => {
	const { id, title, writer, content } = req.body;
	try {
		sqlRoot = "UPDATE board SET title=?, writer=?, content=? WHERE id=?";
		const values = [title, writer, content];
		if(req.allowUpload){
			if(req.allowUpload.allow){
				sql='select count(savefile) from board where id' +id;
				connect =await pool.getConnection();
				rs =await connect.query(sqlRoot,values);
				connect.release();
				if(rs[0][0].savefile){
					fs.removeSync(uploadFolder(rs[0][0].saveFile));
					sqlRoot +='savefile=?, realfile=?';
					values.push(req.file.filename);
					values.push(req.file.originalname);
				}

			}else{
				res.send(alert(`${req.allowUpload.ext}는 업로드 할 수 없습니다.`,'./board'));
			}
			sqlRoot +='where id='+id;
		}
		
		const connect = await pool.getConnection();
		const rs = await connect.query(sql, values);
		connect.release();
		if(rs[0].affectedRows == 1) res.send(alert('수정되었습니다', '/board'));
		else res.send(alert('수정에 실패하였습니다.', '/board'));
	}
	catch(e) {
		if(connect) connect.release();
		next(createError(500,e.sqlMessage));
		
	}
});

router.get('/download',(req,res,next)=>{
	/* let saveFile = req.query.file;
	let realFile = req.query.name; */

	let {file: saveFile, name:realFile } = req.query;

	saveFile=path.join(__dirname,'../uploads',saveFile.substr(0,6),saveFile);
	res.download(saveFile,realFile);
});

router.get('/fileRemove/:id', async(req, res, next)=>{
	let connect ,rs, sql, values, pug;

	try{
		/* sql = 'select * from board where id='+req.params.id;
		connect = await pool.getConnection();
		rs= await connect.query(sql);
		connect.release();
		list=rs[0][0];

		if(list.savefile){
			list.savefile = path.join(__dirname,'../uploads',savefile.substr(0,6),savefile);
			try{
				fs.removeSync(savefile);
				sql = 'update board set savefile=NULL, realfile=NULL';
				connect = await pool.getConnection();
				rs= await connect.query(sql);
				connect.release();
				res.json({code: 200});
			}catch(e){
				res.json({code: 500 , err : e});
			}
		} */

	}catch(e){
		if(connect) connect.release();
		next(createError(500,e.sqlMessage));
	}
	/* res.json({code: 200}); */
});

module.exports = router;