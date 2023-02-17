const {User} = require("../models/user")
const nodemailer = require('nodemailer');
// const crypto = require('crypto');
const randomstring = require("randomstring");
const ResetToken = require("../models/resetToken")
const bcrypt = require("bcrypt")
const createError = require('http-errors');
const {transporter, mailOptions, sendMail} = require("../utilities/sendMail")
const generateTokenAndSend = async (req,res,next) =>{
    const {email} = req.body;

    if(!email) return res.status(400).json({ message: "Please provide valid email" });

    const user = await User.findOne({email : email });
    if(!user) return res.status(400).json({ message: "Invalid email." });

      const myTransporter = transporter()

      const token = randomstring.generate({
        length: 100,
        charset: 'alphanumeric'
      });

      const text = `${process.env.MAIN_WEBSITE_URL}/forget-pasword/${token}`

      const myMailOptions = mailOptions(email,'Password Reset Request',text);
      
      // try {
      //   const data = new ResetToken({
      //       email : req.body.email,
      //       token : token
      //   })
      //   await data.save();
      //   sendMail(res,myTransporter,myMailOptions);
        
      // } catch (error) {
      //   res.status(400).json({ message: 'An error occurred' });
      // }

      const data = new ResetToken({
        email : req.body.email,
        token : token
      })
    
    // data.save((err,doc)=>{
    //     if(err) return res.status(400).json({ message: 'An error occurred' });
    //     sendMail(res,myTransporter,myMailOptions);
    // });  
    data.save()
      .then(response => {
        if (response) sendMail(res,myTransporter,myMailOptions);
        else return res.status(400).json({ message: 'An error occurred' });
      })
      .catch(error => {
          return res.status(400).json({ message: 'An error occurred' });
      })    
}

const verifyAndResetPassword= async( req,res,next)=>{
   try {
      const tokenAndEmail = await ResetToken.findOne({token : req.params.token})
      if(!tokenAndEmail) return res.status(404).json({message :"The link is expired..."});
      
      const {password,confirmPassword} = req.body; 
      
      if(!password) return res.status(404).json({message :"Please give a new password..."})
      if(!confirmPassword) return res.status(404).json({message :"Please confirm the password..."});
      if(password != confirmPassword) return res.status(404).json({message :"Password mismatched..."});

      if(password.length >= 8) {
          const hash = await bcrypt.hash(password, 15);
          const updatePassword = await User.findOneAndUpdate({email : tokenAndEmail.email} , {password : hash})
          res.json({message : "Your password has been updated..."})
        }
      else res.status(404).json({message : "Password length shoul be 8..."});

   } catch (error) {
      next(error)
   }
   


}

module.exports = {
  generateTokenAndSend,
  verifyAndResetPassword
};