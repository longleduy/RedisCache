import passport from 'passport'
import GooglePassport from 'passport-google-oauth'
import user from '../../models/user_infors';
import * as PassportSignInConst from '../../constants/passport_sign_in'

const GoogleStrtegy = GooglePassport.OAuth2Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
passport.use(new GoogleStrtegy({
    clientID: PassportSignInConst.OAUTH2_CLIENT_ID,
    clientSecret: PassportSignInConst.OAUTH2_CLIENT_SECRET,
    callbackURL: PassportSignInConst.OAUTH2_CALLBACK
}, async (accessToken, refreshToken, profile, done) => {
    let userGoogle = new user({
        user_name: profile.displayName,
        email: `${profile.provider}${profile.id}`,
        permisson: "Master",
        provider: profile.provider,
        active: true
    })
    try {
        let data = await user.findOne({ email: profile.emails[0].value });
        if (data) {
            return done(null, data)
        }
        else {
            let data2 = await userGoogle.save();
            return done(null, data2)
        }
    } catch (error) {
        return done(error)
    }

}
))
export default passport;


