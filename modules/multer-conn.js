const multer = require('multer');
const moment = require('moment');
const path=require('path');
const fs= require('fs');
const { v4: uuidv4 } = require('uuid');

const makeFolder=()=>{
    let result ={err:null};

    let folder= path.join(__dirname,'../uploads',moment().format('YYMMDD'));
    result.folder = folder;
    if(!fs.existsSync(folder)){
        fs.mkdir(folder,(err)=>{
            if(err) result.err=err;
            return result;
        });

    }
    else return result;
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const result = makeFolder();
      result.err ?  cb(err) : cb(null, result.folder);
    },
    filename: function (req, file, cb) {
      let ext= path.extname(file.originalname);
      let saveName = moment().format('YYMMDD') + "-" +uuidv4() +ext;
      cb(null,saveName);
    }
  })

const upload =multer({storage :storage});

module.exports = {upload};