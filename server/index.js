require('./database/db')();
const {PORT} = require('./config/config')
const session =  require('./util/session');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('./util/passportGoogle');


const app = express();

//parse json
app.use(express.json());

//url-form-encoded
app.use(express.urlencoded({
    extended: false
}));

//just cors
app.use(cors());

//use session
app.use(session);

//using passport initialize, and using sesion middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/login/google',passport.authenticate("google"));

app.get('/oauth2/redirect/google',passport.authenticate("google",{
    successReturnToOrRedirect: '/login/sucess',
    failureRedirect: '/login/fail'

}))

app.get('/login/sucess',(req,res)=>{
    res.json({"sucess":req.isAuthenticated()});
})

app.get('/login/fail',(req,res)=>{
    res.json({"bad":"somethings"})
})

app.get('/test',(req,res)=>{
    res.json({"msg":req.isAuthenticated()});
})


//start listening
app.listen(PORT, ()=>{
    console.log(`Server is up on ${PORT}`)
});