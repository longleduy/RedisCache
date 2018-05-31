import bcrypt from 'bcrypt';
import session from 'express-session';
import user from '../models/user_infors';
import email from '../models/email_verifys';
import * as hash from '../config/hash';
import * as validate_message from '../constants/valid_message';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../constants/secret_key';
import { emailSender } from '../config/email_sender';
import { task } from '../config/cron_job_send_email'
exports.sign_up = async (req, res) => {
    try {
        let email = await user.find({ email: req.body.email })
        if (email.length > 0) {
            res.status(202).json({
                status: false
            })
        }
        else {
            let a = await hash.hash_pass_async(req.body.pass_word);
            let _new_user = new user({
                user_name: req.body.user_name,
                pass_word: a,
                email: req.body.email,
                permisson: "Master",
                active: false
            });
            _new_user.save((err, data) => {
                if (err) {
                    throw err;
                    res.status(202).json({
                        status: false
                    })
                }
                else {
                    res.status(200).json({
                        status: true
                    })
                    try {
                        let email = req.body.email;
                        let emailEncoded = new Buffer(email).toString('base64');
                        emailSender(email, emailEncoded);
                    } catch (error) {
                        let emailFailed = new email({
                            email: req.body.email
                        })
                        emailFailed.save();
                    }
                }
            })
        }
    } catch (error) {
        throw error;
    }
}
export const check_email = (req, res) => {
    user.find({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        if (data.length > 0) {
            res.json({
                status: false,
                message: validate_message.EMAIL_EXISTS
            })
        }
        else {
            res.json({
                status: true,
                message: validate_message.EMAIL_INVALID
            })
        }
    })
}
export const sign_in = async (req, res) => {
    try {
        let data = await user.find({ email: req.body.email }).exec();
        if (data.length < 1) {
            res.status(202).json({
                detail: 'email',
                message: validate_message.EMAIL_IS_NOT_INVALID
            })
        }
        else {
            let status = await hash.compare_pass(req.body.pass_word, data[0].pass_word);
            if (data[0].active == false) {
                res.status(202).json({
                    detail: 'email',
                    message: validate_message.ERROR_EMAIL_NOT_VERIFY
                })
            }
            else if (status) {
                let payload = {
                    email: data[0].email,
                    user_name: data[0].user_name,
                    permisson: data[0].permisson
                }
                res.status(200).json({
                    message: validate_message.EMAIL_INVALID,
                    token: jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
                })
            }
            else {
                res.status(202).json({
                    detail: 'pass_word',
                    message: validate_message.WRONG_PASSWORD,
                })
            }
        }
    } catch (error) {
        console.log(validate_message.ERROR_MESSAGE);
        console.log(error);
    }

}
export const get_info = async (req, res) => {
    try {
        let data = await user.find({ email: req.query.email }).exec();
        if (data.length > 0) {
            res.json(data[0].user_name);
        }
    } catch (error) {
        console.log(validate_message.ERROR_MESSAGE);
        console.log(error);
    }

}
export const verifyEmail = async (req, res) => {
    let emailEncoded = req.params.email_endcoded;
    let email = new Buffer(emailEncoded, 'base64').toString('ascii');
    try {
        let data = await user.findOneAndUpdate({ email: email, active: false }, { $set: { active: true } });
        if (data) {
            res.writeHead(301,
                { Location: 'http://localhost:8085/sign_in' }
            );
            res.end();
        }
        else {
            res.send("Some Error!");
        }
    } catch (err) {
        res.send("Some Error!");
        throw err
    }
}
export const startEmailSender = (req, res) => {
    task.start();
}
export const stopEmailSender = (req, res) => {
    task.stop();
}
export const destroyEmailSender = (req, res) => {
    task.destroy();
}