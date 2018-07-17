import express from 'express';
import * as user_controller from '../controllers/user_controller';
import * as Authentication from '../controllers/authenication_controller'
import {client} from '../../../app'
const router = express.Router();

router.get('/user/check_email', user_controller.check_email);
router.post('/user/sign_up', user_controller.sign_up);
router.post('/user/sign_in', user_controller.sign_in);
router.get('/user/sign_out', user_controller.signOut);
router.get('/user/get_info', user_controller.get_info);
router.get('/user/verify/:email_endcoded', user_controller.verifyEmail);
router.get('/user/confirm/:key_endcoded', user_controller.confirmResetPassword);
router.post('/user/change_pass_word', Authentication.authentication, user_controller.changePassword);
router.get('/user/check_confirm_reset_password', user_controller.checkConfirmResetPassword);
router.get('/user/reset_password_code', user_controller.sendSecretCode);
router.post('/user/reset_pass_word_by_email', user_controller.resetPasswordByEmail);
router.post('/user/cancel_change_password',Authentication.authentication,user_controller.cancelChangePassword)
router.post('/user/upload_avatar',Authentication.authentication,user_controller.uploadAvatar)
router.get('/admin/start_email_sender', user_controller.startEmailSender);
router.get('/admin/stop_email_sender', user_controller.stopEmailSender);
router.get('/admin/destroy_email_sender', user_controller.destroyEmailSender);
router.post('/user/check_pass_word', user_controller.veryfiPassWord);
module.exports = router;
