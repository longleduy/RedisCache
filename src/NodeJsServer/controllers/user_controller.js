import jwt from 'jsonwebtoken';
import fs from 'fs'
import path from 'path'
import * as hash from '../config/hash';
import * as ValidateMessage from '../constants/valid_message';
import * as Link from '../constants/link'
import { SECRET_KEY } from '../constants/secret_key';
import { emailSender } from '../config/email_sender';
import { task } from '../config/cron_job_send_email'
import user from '../models/user_infors';
import { client } from '../../../app'
import { Error } from 'mongoose';
import * as Common from '../config/common'
import cloudinary from 'cloudinary'
import { error } from 'util';
cloudinary.config({
    cloud_name: 'seatechit',
    api_key: '697115945411315',
    api_secret: '4X8rw_3mR8WC5G19C5JohhRYHlg'
});
exports.sign_up = async (req, res) => {
    try {
        let email = await user.find({ email: req.body.email })
        if (email.length > 0) {
            res.status(202).json({
                status: false
            })
        }
        else {
            let pass_word = await hash.hash_pass_async(req.body.pass_word);
            let _new_user = new user({
                user_name: req.body.user_name,
                pass_word: pass_word,
                email: req.body.email,
                permisson: "Imortal",
                provider: 'main',
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
                    res.status(200).send({
                        status: true
                    })
                    try {
                        let email = req.body.email;
                        let emailEncoded = new Buffer(email).toString('base64');
                        emailSender(email, emailEncoded, 'SIGN_UP_VERIFY');
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
export const check_email = async (req, res) => {
    let data = await user.find({ email: req.query.email });
    try {
        if (data.length > 0) {
            res.status(202).json({
                status: false,
                message: ValidateMessage.EMAIL_EXISTS
            })
        }
        else {
            res.status(200).json({
                status: true,
                message: ValidateMessage.EMAIL_INVALID
            })
        }
    } catch (error) {
        console.log(error)
        res.status(203).json({
            status: false,
            message: ValidateMessage.EMAIL_EXISTS
        })
    }
}
export const sendSecretCode = async (req, res) => {
    let data = await user.find({ email: req.query.email });
    try {
        if (data.length > 0) {
            let randomKey = Common.randomKey(data[0]._id);
            let keyRedis = `_resetPassWord-${req.query.email}`;
            let reply = await client.setexAsync(keyRedis, 60 * 10, randomKey);
            res.status(200).json({
                message: ValidateMessage.EMAIL_EXISTS
            })
            emailSender(req.query.email, randomKey, 'RESET_PASSWORD_CONFIRM');
        }
        else {
            res.status(202).json({
                message: ValidateMessage.EMAIL_NOT_EXISTS
            })
        }
    } catch (error) {
        console.log(error)
        res.status(203).json({
            message: ValidateMessage.EMAIL_NOT_EXISTS
        })
    }
}
export const resetPasswordByEmail = async (req, res) => {
    try {
        let keyRedis = `_resetPassWord-${req.body.email}`;
        let secretCode = await client.getAsync(keyRedis);
        if (secretCode && secretCode == req.body.scret_code) {
            let newPassword = await hash.hash_pass_async(req.body.newPassword);
            let isUpdate = await user.findOneAndUpdate({ email: req.body.email }, { $set: { pass_word: newPassword } });
            if (isUpdate) {
                res.status(200).json({});
                let reply = await client.delAsync(keyRedis);
            }
            else {
                throw new Error()
            }
        }
        else {
            res.status(202).json({
                message: 'Secret code is not invalid'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(203).json({
            message: 'ERROR'
        })
    }
}
export const sign_in = async (req, res) => {
    try {
        let data = await user.find({ email: req.body.email }).exec();
        if (data.length < 1) {
            res.status(202).json({
                detail: 'email',
                message: ValidateMessage.EMAIL_IS_NOT_INVALID
            })
        }
        else {
            let status = await hash.compare_pass(req.body.pass_word, data[0].pass_word);
            if (data[0].active == false) {
                res.status(202).json({
                    detail: 'email',
                    message: ValidateMessage.ERROR_EMAIL_NOT_VERIFY
                })
            }
            else if (status) {
                let avatarId = data[0].avatar;
                let payload = {
                    email: data[0].email,
                    user_name: data[0].user_name,
                    permisson: data[0].permisson,
                    provider: data[0].provider
                }
                req.session.payload = payload;
                req.session.userInfo = data[0];
                res.status(200).json({
                    message: ValidateMessage.EMAIL_INVALID,
                    userInfo: {
                        token: jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }),
                        avatar: avatarId
                    }
                })
            }
            else {
                res.status(202).json({
                    detail: 'pass_word',
                    message: ValidateMessage.WRONG_PASSWORD,
                })
            }
        }
    } catch (error) {
        console.log(ValidateMessage.ERROR_MESSAGE);
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
        console.log(ValidateMessage.ERROR_MESSAGE);
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
                { Location: Link.SIGN_IN }
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
export const signOut = async (req, res) => {
    try {
        await req.session.destroy();
        res.status(200).json({
            message: 'Success'
        })
    } catch (error) {
        res.status(202).json({
            message: 'Sign Out failed'
        })
    }
}
export const signAuth = async (req, res) => {
    try {
        let userInfo = req.session.passport.user;
        let payload = {
            email: userInfo.email,
            user_name: userInfo.user_name,
            permisson: userInfo.permisson,
            provider: userInfo.provider
        }
        req.session.payload = payload;
        let token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
        res.status(200).json({
            message: ValidateMessage.AUTH_SIGN_IN_SUCCESS,
            token: token
        })
    } catch (error) {
        res.status(202).json({
            message: 'Auth login fail'
        })
        console.log(error)
    }
}
export const changePassword = async (req, res) => {
    try {
        let { email } = req.session.payload;
        let fieldValue = req.body;
        let isMatch = await hash.compare_pass(fieldValue.currentPassword, req.session.userInfo.pass_word);
        if (isMatch) {
            let newPassword = await hash.hash_pass_async(fieldValue.newPassword);
            let currentDate = new Date().toLocaleString();
            let payload = {
                passWord: newPassword,
                currentDate: currentDate
            }
            //let data = await user.findOneAndUpdate({ email: req.session.userInfo.email }, { $set: { pass_word: newPassword } })
            let key = `_changePassWord-${req.session.userInfo.email}`;
            let reply = await client.setexAsync(key, 1800, JSON.stringify(payload));
            let keyEndcoded = new Buffer(key).toString('base64');
            let payloadSendEmail = {
                keyEndcoded,
                currentDate
            }
            if (reply) {
                res.status(200).json({
                    message: ValidateMessage.SUCCESS,
                })
                emailSender(req.session.userInfo.email, payloadSendEmail, 'CHANGE_PASSWORD_CONFIRM');
            }
        }
        else {
            res.status(202).json({
                errMessage: ValidateMessage.CURRENT_PASS_WORD_NOT_INVALID,
                field: "currentPassword"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(203).json({
            errMessage: ValidateMessage.EXCEPTION,
            field: ""
        })
    }
}
export const cancelChangePassword = async (req, res) => {
    try {
        let keyRedis = `_changePassWord-${req.session.userInfo.email}`;
        let reply = await client.delAsync(keyRedis);
        res.status(200).json({})
    } catch (error) {
        console.log(error)
        res.status(203).json({
            message: 'ERROR'
        })
    }
}
export const confirmResetPassword = async (req, res) => {
    try {
        let keyEndcoded = req.params.key_endcoded;
        let key = new Buffer(keyEndcoded, 'base64').toString('ascii');
        let email = key.replace('_changePassWord-', '');
        let data = await client.getAsync(key);
        if (data) {
            let newPassword = JSON.parse(data).passWord;
            let isUpdate = await user.findOneAndUpdate({ email }, { $set: { pass_word: newPassword } });
            if (isUpdate) {
                let reply = await client.delAsync(key);
                if (reply == '1') {
                    res.send('Success')
                }
                else {
                    throw new Error()
                }
            }
            else {
                throw new Error()
            }
        }
        else {
            throw new Error()
        }
    } catch (error) {
        res.send('Time out!');
    }
}
export const checkConfirmResetPassword = async (req, res) => {
    try {
        let key = `_changePassWord-${req.session.userInfo.email}`;
        let data = await client.getAsync(key);
        if (data) {
            let currentDate = JSON.parse(data).currentDate;
            res.status(200).json({
                message: 'SUCCESS',
                currentDate
            })
        }
        else {
            res.status(202).json({
                message: 'EMPTY'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(202).json({
            message: 'ERROR'
        })
    }
}
export const uploadAvatar = async (req, res) => {
    try {
        let infoUpdate = req.body;
        let { email } = req.session.userInfo;
        let data = await user.findOneAndUpdate({ email }, { $set: infoUpdate });
        if (data) {
            let payload = {
                email: typeof infoUpdate.email != 'undefined' ? infoUpdate.email : data.email,
                user_name: typeof infoUpdate.user_name != 'undefined' ? infoUpdate.user_name : data.user_name,
                permisson: typeof infoUpdate.permisson != 'undefined' ? infoUpdate.permisson : data.permisson,
                provider: typeof infoUpdate.provider != 'undefined' ? infoUpdate.provider : data.provider,
            }
            req.session.payload = payload;
            if(typeof infoUpdate.email != 'undefined'){
               data.email=infoUpdate.email
            }
            req.session.userInfo = data;
            
            let userInfo = {
                message: 'SUCCESS',
                token: jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }),
            };
            if (typeof infoUpdate.avatar != 'undefined'){
                userInfo['avatar'] = infoUpdate.avatar
            }
            res.status(200).json({
                userInfo
            })
        }
        else {
            throw new Error()
        }
    } catch (error) {
        console.log(error);
        res.status(203).json({
            message: 'ERROR'
        })
    }
}
export const test = async (req, res) => {
    try {
        let result = await cloudinary.uploader.destroy('f957k7p1bffjb8xe9a58');
        res.send(result);
    } catch (error) {
        throw error
    }

}
export const  veryfiPassWord = async (req,res) => {
    try {
        let { email } = req.session.payload;
        let data = await user.find({ email }).exec();
        if (data.length < 1) {
            throw new Error()
        }
        else {
            let status = await hash.compare_pass(req.body.passWord, data[0].pass_word);
            if (status) {
                res.status(200).json({
                    message: 'SUCCESS'
                })
            }
            else{
                throw new Error()
            }
        }
    } catch (error) {
        res.status(202).json({
            message: 'ERROR'
        })
        throw error;
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
export const viewSession = (req, res) => {
    console.log(req.session.payload);
}
