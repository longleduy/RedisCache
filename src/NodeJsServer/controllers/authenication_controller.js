import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../constants/secret_key'
import user from '../models/user_infors';
export const authentication = async (req, res, next) => {
    if (req.headers.authorization != null && req.headers.authorization != "notAuthen") {
        let token = req.headers.authorization.replace("Beare ", "");
        try {
            let payload = await jwt.verify(token, SECRET_KEY);
            let data = await user.findOne({ email: payload.email, user_name: payload.user_name }).exec();
            if(data){
                res.status(200).json({
                    message: 'Success'
                })
               return next();
            }
            else{
                res.status(202).json({
                    message: 'Is not authen'
                })
            }
        } catch (error) {
            res.status(202).json({
                message: 'Is not authen'
            })
        }

    }
}