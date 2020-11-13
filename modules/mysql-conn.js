const mysql = require('mysql2/promise');

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,
	waitForConnections: true,
	connectionLimit: 10
});
// mode = i,u, s, d
//field = ['title', 'writer','content']
//table='tableName'
//data={table:'A', content : 'B'} //req.body
//file= {filename:'201113-.jpg', originalname : 'abc.jpg' size :1234} //req.file
//id= id값
/* const sqlGen= (table, obj)=>{
	let {mode=null , field=[] , data={},file=null,id=null, desc=null}=obj;
	let sql = null, values=[];
	let temp= Object.entries(data).filter(v=>field.includes(v[0]));
	console.log(temp);
	//const sql='insert into table set title=?, writer=?';
	//const sql= ''
	switch(mode){
		case 'I':
		sql= `insert into ${table} set`;
		break;
		
		case 'U':
			sql=`update ${table} set`;
		break;
		case 'D':
			sql=`delete from ${table} where id=${id} `;
		break;
		case 'S':
			sql=`select ${field.length ? '*': field.toString()} from ${table} `;
			if(id) sql += `where id=${id}` ;
			if(desc) sql +=`${desc} `;
			break;
	}
	for(let v of temp){
		sql +=`${v[0]}=?`;
		values.push(v[1]);
	}
	if(file){
		sql +=`savefile=?,realfile=?, `;
		values.push(file.filename);
		values.push(file.originalname);
	}
	sql= sql.substr(0, sql.length -1);

	if(mode == 'I', mode == 'U') sql += ` WHERE id=${id}`;

	return {sql, values}
} */

const sqlGen = (table, obj) => {
	let {mode=null, field=[], data={}, file=null, id=null, desc=null} = obj;
	let sql=null, values=[];
	let temp = Object.entries(data).filter(v => field.includes(v[0]));

	switch(mode) {
		case 'I':
			sql = `INSERT INTO ${table} SET `;
			break;
		case 'U':
			sql = `UPDATE ${table} SET `;
			break;
		case 'D':
			sql = `DELETE FROM ${table} WHERE id=${id} `;
			break;
		case 'S':
			sql = `SELECT ${field.length == 0 ? '*' : field.toString()} FROM ${table} `;
			if(id) sql += ` WHERE id=${id} `;
			if(desc) sql += ` ${desc} `;
			break;
	}

	for(let v of temp) {
		sql += `${v[0]}=?,`;
		values.push(v[1]);
	}

	if(file) {
		sql += `savefile=?,realfile=?,`;
		values.push(file.filename);
		values.push(file.originalname);
	}
	sql = sql.substr(0, sql.length - 1);
	if(mode == 'I', mode == 'U') sql += ` WHERE id=${id}`;
	return { sql, values }
}


module.exports = { mysql, pool ,sqlGen };