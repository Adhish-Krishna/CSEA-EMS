import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const USER_EMAIL = process.env.USER_EMAIL!;

const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD!;

const sendSecurityCodeEmail = (to: string, code: string) =>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: USER_EMAIL,
            pass: EMAIL_APP_PASSWORD
        },
    });

    const mailOtions = {
        from: USER_EMAIL,
        to: to,
        subject: "EMS Password Recovery",
        text: `Your password recovery code is: ${code}`
    }

    transporter.sendMail(mailOtions, (err, info)=>{
        if(err){
            console.log(err.message);
        }
        else{
            console.log(info.response);
        }
    });
}

export {sendSecurityCodeEmail}