import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../constants/secret_key'
import user from '../models/user_infors';
export const authentication = async (req, res, next) => {
    if (req.headers.authorization != null && req.headers.authorization != "notAuthen") {
        let token = req.headers.authorization.replace("Beare ", "");
        try {
            let payload = await jwt.verify(token, SECRET_KEY);
            if(payload.email == req.session.payload.email){
                let data = await user.findOne({ email: payload.email, user_name: payload.user_name }).exec();
                if(data){
                   return next();
                }
                else{
                    res.status(204).json({
                        message: 'Is not authen'
                    })
                }
            }
            else{
                res.status(204).json({
                    message: 'Is not authen'
                })
            }
        } catch (error) {
            console.log(error)
            res.status(204).json({
                message: 'Is not authen'
            })
        }

    }
}