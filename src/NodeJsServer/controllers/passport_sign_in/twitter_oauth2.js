import passport from 'passport'
import TwitterPassport from 'passport-twitter'
import user from '../../models/user_infors';
import * as PassportSignInConst from '../../constants/passport_sign_in'
import findOrCreate from 'mongoose-findorcreate'
const TwitterStrategy  = TwitterPassport.Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
passport.use(new TwitterStrategy({
    consumerKey: PassportSignInConst.TWITTER_CONSUMER_KEY,
    consumerSecret: PassportSignInConst.TWITTER_CONSUMER_SECRET,
    callbackURL: PassportSignInConst.OAUTH2_TWITTER_CALLBACK,
    userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
}, async (accessToken, refreshToken, profile, done) => {
    let userTwitter = new user({
        user_name: profile.displayName,
        email: `${profile.provider}${profile.id}`,
        permisson: "Member",
        provider: profile.provider,
        active: true
    })
    try {
        let data = await user.findOne({ email: profile.id });
        if (data) {
            return done(null, data)
        }
        else {
            let data2 = await userTwitter.save();
            return done(null, data2)
        }
    } catch (error) {
        return done(error)
    }

}
))
export default passport;


