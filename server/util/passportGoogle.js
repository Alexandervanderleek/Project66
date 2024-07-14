const  { User }  = require('../models/User');
const {GOOGLE_SECRET, GOOGLE_ID, GOOGLE_REDIRECT} = require('../config/config')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
const {InternalError, UserError} = require('./customErrors');

passport.use(
    new GoogleStrategy({
        clientID: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: GOOGLE_REDIRECT,
        scope: ['profile','email'],
        state: true,
    },  async function (accessToken,refreshToken, profile, cb){
       
        const {id, displayName, emails, photos} = profile;

        const email = emails[0].value;
        const emailVerified = emails[0].verified;
        const fullName = displayName;
        const profilePic = photos[0].value;

        if(emailVerified){
           try{

                let user = await User.findOne({
                    googleId: id
                });

                if(!user){
                    
                    const createdUser = new User({
                        name: fullName,
                        email: email,
                        googleId: id,
                        picture: profilePic
                    });
                    
                    const newUser = await createdUser.save();
                    
                    return cb(null, newUser);
                }else{
                    return cb(null, user);
                }
           }catch(err){
                return cb(new InternalError("Couldn't create the account"));
           }
        }else{
            return cb(new UserError("Email is not verified"));
        }
    })
);

//Serialize the user item
passport.serializeUser((user, cb) => {
    try{        
        process.nextTick(()=>{
            cb(null, user.googleId);
        })
    }catch(err){
        new InternalError("Serialization failed");
    }
})

//deserialize [only done once for session]
passport.deserializeUser(async (id, cb) => {

    if(id) {
        try{
            const user = await User.findOne({googleId: id});

            if(user){
                return cb(null, user);
            }else{
                return cb(new UserError("Could Not Find User"), null);
            }

        } catch (error){
            return cb(new InternalError("Something went wrong deserialize"), null);
        }
    }else{
        return cb(new UserError("Invalid Cookie"), null)
    }
})