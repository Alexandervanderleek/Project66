const  { User }  = require('../models/User');
const {GOOGLE_SECRET, GOOGLE_ID, GOOGLE_REDIRECT} = require('../config/config')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')

passport.use(
    new GoogleStrategy({
        clientID: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: GOOGLE_REDIRECT,
        scope: ['profile','email'],
        state: true,
    },  async function (accessToken,refreshToken, profile, cb){

        console.log(accessToken)
        console.log(refreshToken)

        console.log(profile);
       
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
                    
                    console.log("need a new user")

                    const createdUser = new User({
                        name: fullName,
                        email: email,
                        googleId: id,
                        picture: profilePic
                    });
                    
                    const newUser = await createdUser.save();
                    
                    return cb(null, newUser);
                }else{

                    console.log("have a user")

                    return cb(null, user);
                }

           }catch(err){

                console.log(err)

                return cb(new Error("Could Not Create Account", null));
           }
        }else{
            return cb(new Error("Email is not verified",null));
        }
    })
);

//Serialize the user item
passport.serializeUser((user, cb) => {
    
    try{
        console.log("serealize");

        console.log(user)
        
        process.nextTick(()=>{
            cb(null, user.googleId);
        })
    }catch(err){
        console.log(err)
        new Error("What")
    }
    
})

//deserialize
passport.deserializeUser(async (id, cb) => {

    console.log("deserelize")


    if(id) {
        try{
            const user = await User.findOne({googleId: id});

            if(user){
                return cb(null, user);
            }else{
                return cb(new Error("could not find user"), null);
            }

        } catch (error){
            return cb(new Error(error.message), null);
        }
    }else{
        return cb(new Error("No ID found"), null)
    }
})