
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import favicon from 'serve-favicon'
import redis from 'redis'
import redisConnect from 'connect-redis'
import session from 'express-session'
import db from './src/NodeJsServer/config/db'
import user from './src/NodeJsServer/routers/user'
import auth from './src/NodeJsServer/routers/auth_sign_in'
import passport from 'passport'
import Bluebird  from 'bluebird'
Bluebird.promisifyAll(redis.RedisClient.prototype)
Bluebird.promisifyAll(redis.Multi.prototype)
export const client =  redis.createClient()
const app = express();
const RedisStore = redisConnect(session);
const urlencodedParser = bodyParser.urlencoded({ extended: false });

client.on('connect', function() {
    console.log('RedisDB connected');
});
app.use(bodyParser.json());
app.use(urlencodedParser);
app.use(session({
    secret: "longld",
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ host: 'localhost', port: 6379, client: client }),
    cookie: {
        //must be served over https
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        expires: false
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(function (req, res, next) {
    console.log(req.path)
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization ');
    next();
});
app.use('/', user);
app.use('/auth', auth);
export default app;