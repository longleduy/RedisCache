import nodemailer from 'nodemailer'
//Todo: Utils
import * as EmailSenderInfo from '../constants/email_sender_info'
export const emailSender = (to, data, fun) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: EmailSenderInfo.USER_NAME,
            pass: EmailSenderInfo.PASS_WORD
        }
    });
    let html;
    if (fun == 'SIGN_UP_VERIFY') {
        subject = 'Verify email address'
        html = htmlSignUpVerify(data)
    }
    else if (fun == 'CHANGE_PASSWORD_CONFIRM') {
        html = htmlChangePasswordConfirm(data)
        subject = 'Reset password confirm'
    }
    let mailOptions = {
        from: EmailSenderInfo.EMAIL_FROM,
        to: to,
        subject,
        html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(`Email was sended to ${to}`);
    });

}
const htmlSignUpVerify = (data) => {
    return `<html>

    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Page Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="font-family: Tahoma;">
        <div style="    width: 45%;
        background-color: #627898;
        min-height: 315px;
        margin: 0 auto;
        text-align: center;">
        <label style="font-weight: bold;
        padding-top: 20px;
        display: block;
        font-size: 20px;
        color: white;">React & NodeJs Application</label>
        <p style="margin-top: 60px;
        padding-right: 15px;
        padding-left: 15px;
        color: white;font-size:15px;">Thanks for sign up! We just need you verify your email address to complete setting up your account</p>
            <a href="https://localhost:8000/user/verify/:${data}" style="text-align: center;text-align: center;
            text-decoration: none;
            background-color: white;
            display: inline-block;
            padding: 11px 31px;
            font-weight: bold;
            color: #627898;
            border-radius: 3px;box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);">Verify</a>
        </div>
    </body>
    
    </html>`
}
const htmlChangePasswordConfirm = (data) => {
    return `<html>

    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Page Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="font-family: Tahoma;">
        <div style="    width: 45%;
        background-color: #627898;
        min-height: 315px;
        margin: 0 auto;
        text-align: center;">
        <label style="font-weight: bold;
        padding-top: 20px;
        display: block;
        font-size: 20px;
        color: white;">React & NodeJs Application</label>
        <p style="margin-top: 60px;
        padding-right: 15px;
        padding-left: 15px;
        color: white;font-size:15px;">We recevied a request to reset your pass word to your React & NodeJs Application accounts
        . To reset your pass word, please click the button below.
        </p>
        <label style="display: block;color: white">Reset time: ${data.currentDate}</label>
        <label style="display: block;margin: 20px 0px;color: #00e200;font-size: 15px;">If you did not request a password reset, please ignore this-email</label>
            <a href="http://localhost:8000/user/verify/:${data.keyEndcoded}" style="text-align: center;text-align: center;
            text-decoration: none;
            background-color: white;
            display: inline-block;
            padding: 11px 31px;
            font-weight: bold;
            color: #627898;
            border-radius: 3px;box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);">Reset</a>
        </div>
    </body>
    </html>`
}
