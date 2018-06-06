import express from 'express';
import * as user_controller from '../controllers/user_controller';
import * as Authentication from '../controllers/authenication_controller'
import passport from '../controllers/google_oauth2'
const router = express.Router();

router.post('/user/check_email', user_controller.check_email);
router.post('/user/sign_up', user_controller.sign_up);
router.post('/user/sign_in', user_controller.sign_in);
router.get('/user/sign_out', user_controller.signOut);
router.get('/user/get_info', user_controller.get_info);
router.get('/user/verify/:email_endcoded', user_controller.verifyEmail);
router.get('/admin/start_email_sender', user_controller.startEmailSender);
router.get('/admin/stop_email_sender', user_controller.stopEmailSender);
router.get('/admin/destroy_email_sender', user_controller.destroyEmailSender);
router.post('/session/view', Authentication.authentication, user_controller.viewSession);
router.post('/auth/gooogle_sign_in', user_controller.signGoogleAuth);
router.get('/auth/google', passport.authenticate('google',
    { scope: ['profile', 'email'], session: true }));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: true }),
    (req, res) => {
        req.session.user = req.user
        res.redirect('https://localhost:8085/confirm_auth_sign_in')
    }
);
router.get('/session/save', (req, res) => {
    res.send("Test")
});
module.exports = router;
