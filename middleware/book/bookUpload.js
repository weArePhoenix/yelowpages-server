const uploader = require('../../utilities/singleUpload')
function bookUpload(req,res,next) {
    const upload = uploader(
        'bookImage',
        ["image/jpeg","image/jpg","image/png"],
        1000000,
        "Only .jpg,.jpeg and png file allowed"
    )
    //call the middleware function.
    upload.any()(req,res ,(err)=>{
        if(err){
            res.status(500).json({
                message : err.message,
            })
        }else {
            next();
        }
    })
}

module.exports = bookUpload;