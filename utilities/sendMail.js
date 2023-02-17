const nodemailer = require("nodemailer");

const transporter =()=>{
    return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'phoenix.squad.2022@gmail.com',
                pass: 'tmynmdwivzvisqis',
            },
      });
}

const mailOptions = (email,subject,text) => {
    return {
        from: 'phoenix.squad.2022@gmail.com',
        to: email,
        subject: subject,
        text: text
    }
}


const sendMail = (res,transporter,mailOptions) =>{
    transporter.sendMail(mailOptions, (err) => {
        if (err) {
          return res.status(500).json({ message: 'An error occurred ' });
        }
        res.json({ message: 'An email has been sent with further instructions' });
      });
}

module.exports = {
    transporter,mailOptions,sendMail
}