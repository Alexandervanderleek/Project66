const  User   = require('../models/user');
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
        passReqToCallback: true,
    },  async function (req, accessToken,refreshToken, profile, cb){
       
        const {id, displayName, emails, photos} = profile;

        const email = emails[0].value;
        const emailVerified = emails[0].verified;
        const fullName = displayName;
        const profilePic = photos[0].value;

        //ensure email verififed
        if(emailVerified){
           try{
                let user = await User.findOne({email: email});

                if(!user){
                    const createdUser = new User({
                        name: fullName,
                        email: email,
                        picture: profilePic
                    });
                    
                    const newUser = await createdUser.save();
                    
                    return cb(null, newUser.toJSON());
                }else{
                    return cb(null, user.toJSON());
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
//called before session created, and defines what goes in the session
passport.serializeUser((req, user, cb) => {
    try{        
        process.nextTick(()=>{
            cb(null, user);
        })
    }catch(err){
        new InternalError("Serialization failed");
    }
})

//deserialize [only done once for session]
//called subsequent requests get information out of session w/id done for us
passport.deserializeUser(async (req, user, cb) => { 
    if(user) {
        try{
            return cb(null, user);
        } catch (error){
            return cb(new InternalError("Something went wrong deserialize"), null);
        }
    }else{
        return cb(new UserError("Invalid Cookie"), null)
    }
})