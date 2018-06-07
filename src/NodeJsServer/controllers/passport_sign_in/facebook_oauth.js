import passport from 'passport'
import FacebookPassport from 'passport-facebook'
import user from '../../models/user_infors';
import * as PassportSignInConst from '../../constants/passport_sign_in'
const FacebookStrategy  = FacebookPassport.Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
passport.use(new FacebookStrategy({
    clientID: PassportSignInConst.FACEBOOK_APP_ID,
    clientSecret: PassportSignInConst.FACEBOOK_APP_SECRET,
    callbackURL: PassportSignInConst.OAUTH2_FACEBOOK_CALLBACK,
    profileFields: ['id', 'displayName', 'email', 'first_name', 'gender']
}, async (accessToken, refreshToken, profile, done) => {
    let email = `${profile.provider}${profile.id}`
    let userFacebook = new user({
        user_name: profile.displayName,
        email: email,
        permisson: "Member",
        provider: profile.provider,
        active: true
    })
    try {
        let data = await user.findOne({ email: email });
        if (data) {
            return done(null, data)
        }
        else {
            let data2 = await userFacebook.save();
            return done(null, data2)
        }
    } catch (error) {
        return done(error)
    }

}
))
export default passport;


