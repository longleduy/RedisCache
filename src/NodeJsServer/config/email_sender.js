import nodemailer from 'nodemailer'
//Todo: Utils
import * as EmailSenderInfo from '../constants/email_sender_info'
export const emailSender = (to, token) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: EmailSenderInfo.USER_NAME,
            pass: EmailSenderInfo.PASS_WORD
        }
    });

    let mailOptions = {
        from: EmailSenderInfo.EMAIL_FROM,
        to: to,
        subject: 'Verify email address',
        html: `<html>

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
                <a href="http://localhost:8000/user/verify/:${token}" style="text-align: center;text-align: center;
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
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(`Email was sended to ${to}`);
    });
}
