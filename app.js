
import express from 'express';
import http from 'http';
import fs from 'fs';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import favicon from 'serve-favicon';
import db from './src/NodeJsServer/config/db';
import product from './src/NodeJsServer/models/products.js';
import user from './src/NodeJsServer/models/user_infors.js';

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(urlencodedParser);

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.post('/user/signup', (req, res) => {
    let _new_user = new user({
        user_name: req.body.user_name,
        pass_word: req.body.pass_word,
        email: req.body.email
    });
    _new_user.save((err,data)=>{
        if(err) throw err;
        res.send(data);
    });
    
})
app.post('/user/check_email', (req, res) => {
user.find({email: req.body.email},(err,data)=>{
    if(err) throw err;
    if(data.length > 0){
        res.json({
            status: false,
            message: 'Email đã được đăng ký'
        })
    }
    else{
        res.json({
            status: true,
            message: 'Email hợp lệ'
        })
    }
})
})
export default app;