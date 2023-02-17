const createHttpError = require("http-errors");
const multer = require("multer");
const path = require('path')

function uploader(subFolderPath,aloowedFileType,maxFileSize,errorMsg) {
    const uploadFolder = `${__dirname}/../public/uploads/${subFolderPath}/`
    
    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,uploadFolder);
        },
        filename:(req,file,cb)=>{
            const fileExt =  path.extname(file.originalname)
            const filename =  file.originalname
                                .replace(fileExt,"")
                                .toLowerCase()
                                .split(" ").join("-") + "-" +Date.now()
    
            cb(null,filename+fileExt)
    
        }
    })
    const upload = multer({
        storage:storage,
        limits :{
            fileSize : maxFileSize
        },
        fileFilter : (req,file,cb)=>{
            if(aloowedFileType.includes(file.mimetype)){
                cb(null,true)
            }else cb(createHttpError(errorMsg))
        }
    })
    return upload;
}

module.exports = uploader;