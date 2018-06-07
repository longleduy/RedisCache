import express from 'express';

import passportGoogle from '../controllers/passport_sign_in/google_oauth2'
import passportTwitter from '../controllers/passport_sign_in/twitter_oauth2'
import passportFacebook from '../controllers/passport_sign_in/facebook_oauth'
import * as UserController from '../controllers/user_controller'
import * as Link from '../constants/link'
const router = express.Router();

//Todo: Passport Google
router.post('/auth_sign_in', UserController.signAuth);
router.get('/google', passportGoogle.authenticate('google',
    { scope: ['profile', 'email'], session: true }));
router.get('/google/callback',
    passportGoogle.authenticate('google', { failureRedirect: Link.SIGN_IN, session: true }),
    (req, res) => {
        res.redirect(Link.CONFIRM_SIGN_IN)
    }
);
//Todo: Passport Twitter
router.get('/twitter', passportTwitter.authenticate('twitter',
    { scope: ['profile', 'email'], session: true }));
router.get('/twitter/callback',
    passportTwitter.authenticate('twitter', { failureRedirect: Link.SIGN_IN, session: true }),
    (req, res) => {
        res.redirect(Link.CONFIRM_SIGN_IN)
    }
);
router.get('/session/save', (req, res) => {
    res.send("Test")
});

//Todo: Passport Facebook
router.get('/facebook',
    passportFacebook.authenticate('facebook',
        { scope: ['email', 'public_profile'], session: true }));
router.get('/facebook/callback',
    passportTwitter.authenticate('facebook', { failureRedirect: Link.SIGN_IN, session: true }),
    (req, res) => {
        res.redirect(Link.CONFIRM_SIGN_IN)
    }
);
router.get('/session/save', (req, res) => {
    res.send("Test")
});
module.exports = router;
