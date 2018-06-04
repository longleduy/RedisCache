
import express from 'express';
import http from 'http';
import fs from 'fs';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import favicon from 'serve-favicon';
import redis from 'redis'
import redisConnect from 'connect-redis'
import session from 'express-session'
import db from './src/NodeJsServer/config/db';
import user from './src/NodeJsServer/routers/user';

const  client  = redis.createClient();
const app = express();
const RedisStore = redisConnect(session);
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(urlencodedParser);
app.use(session({
    secret: "longld",
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ host: 'localhost', port: 6379, client: client}),
    cookie: {
        //must be served over https
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        expires: false
    } 
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(function (req, res, next) {
    //Todo: Cấu hình để sử dụng được req.session nhận từ axios
    res.header("Access-Control-Allow-Origin", 'http://localhost:8085');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use('/', user);
export default app;