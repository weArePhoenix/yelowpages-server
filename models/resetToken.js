const mongoose = require('mongoose');

const resetTokens = new mongoose.Schema({
    token :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    // expireAt : {
    //     type : Date,
    //     default : Date.now(new Date().valueOf()+ 600000),
    //     expires : 500
    // }
},{ timestamps: true })

module.exports = mongoose.model("resetToken",resetTokens)