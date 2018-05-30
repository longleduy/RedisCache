import express from 'express';
import * as user_controller from '../controllers/user_controller';
import * as Authentication from '../controllers/authenication_controller'
const router=express.Router();

router.post('/user/check_email',user_controller.check_email);
router.post('/user/sign_up',user_controller.sign_up);
router.post('/user/sign_in',user_controller.sign_in);
router.get('/user/get_info',user_controller.get_info);
router.post('/user/test', Authentication.authentication,user_controller.demo);
module.exports=router;
