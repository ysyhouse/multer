//crypt :단방향 암호화
//cipher : 양방향 암호화
//session : 서버가 가지는 전역변수

//cookie :클라이언트가 가지는 전역변수
//cors - Cross Origin Resource Share -통신규칙
//proxy - foward proxy/reverse proxy 


const crypto = require('crypto');
let password = 'abcd1234';
let salt = 'vmaeddfsdmvafb++'; 
let hash =crypto.createHash('sha512').update(password+salt).digest('base64');
hash =crypto.createHash('sha512').update(password+salt).digest('base64');
hash =crypto.createHash('sha512').update(password+salt).digest('base64');
hash =crypto.createHash('sha512').update(password+salt).digest('base64');

console.log(hash);


const cipher = crypto.createCipher('aes-256-cbc',salt);
let result = cipher.update('아버지를 아버지','utf-8','base64');
result += cipher.final('base64');
console.log(result);


let deciphter=crypto.createDecipher('aes-256-cbc',salt);
let result2= deciphter.update(result, 'base64','utf-8');
result2 +=deciphter.final('utf-8');

console.log(result2);

