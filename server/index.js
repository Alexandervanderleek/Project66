require('./database/db')();
const {PORT} = require('./config/config')
const session =  require('./util/session');
const express = require('express');
const cors = require('cors');
const passport = require('passport');


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



//start listening
app.listen(PORT, ()=>{
    console.log(`Server is up on ${PORT}`)
});