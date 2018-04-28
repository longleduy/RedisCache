
import express from 'express';
import http from 'http';
import fs from 'fs';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import favicon from 'serve-favicon';
import db from './src/NodeJsServer/config/db';
import product from './src/NodeJsServer/models/products.js';

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/a', (req, res) => {
    new product({
        id : 9,
        name : "Storm whisperer",
        img : "https://steamuserimages-a.akamaihd.net/ugc/870746005981912107/C8C65683C87BDE8DB367589A0DC14205DC2F3A74/?interpolation=lanczos-none&output-format=jpeg&output-quality=95&fit=inside%7C268%3A268&composite-to=*,*%7C268%3A268&background-color=black",
        description : "Nvdia Company",
        price : 1000,
        inventory : 9999,
        rate : 5
    }).save((err,data)=>{
        if(err) throw err;
        res.json(data);
    });
})

export default app;