import express from 'express';
import * as user_controller from '../controllers/user_controller';
import * as Authentication from '../controllers/authenication_controller'
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
router.post('/session/view',Authentication.authentication, user_controller.viewSession);
router.get('/session/save', (req, res) => {
    console.log("destroy")
    req.session.destroy();
});
module.exports = router;
