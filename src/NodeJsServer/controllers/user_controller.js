import bcrypt from 'bcrypt';
import session from 'express-session';
import user from '../models/user_infors';
import * as hash from '../config/hash';
import * as validate_message from '../constants/valid_message';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../constants/secret_key';

exports.sign_up = async (req, res) => {
    let a = await hash.hash_pass_async(req.body.pass_word);
    let _new_user = new user({
        user_name: req.body.user_name,
        pass_word: a,
        email: req.body.email
    });
    _new_user.save((err, data) => {
        if (err) {
            throw err;
            res.json({
                status: false
            })
        }
        else {
            res.json({
                status: true
            })
        }
    })
}
exports.check_email = (req, res) => {
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
exports.sign_in = async (req, res) => {
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
            if (status) {
                let payload = {
                    email: data[0].email,
                    user_name: data[0].user_name,
                    permisson: data[0].permisson
                }
                res.status(200).json({
                    message: validate_message.EMAIL_INVALID,
                    token: jwt.sign(payload, SECRET_KEY)
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
exports.get_info = async (req, res) => {
    try {
        let data = await user.find({ email: req.query.email }).exec();
        if(data.length > 0){
            res.json(data[0].user_name);
        }
    } catch (error) {
        console.log(validate_message.ERROR_MESSAGE);
        console.log(error);
    }

}
export const demo = (req,res) => {
    console.log("Done");
}