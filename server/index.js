require('./database/db')();
const {PORT} = require('./config/config')
const {sesh} =  require('./util/session');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const passport = require('passport');
require('express-async-errors')
require('./util/passportGoogle');
const middleware = require('./middleware/middleware');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const habbitRouter = require('./routes/habbitRoutes');

const app = express();

//just cors
app.use(cors());

//parse json
app.use(express.json());

//url-form-encoded
app.use(express.urlencoded({
    extended: false
}));

//use session
app.use(sesh);

//using passport initialize, and using sesion middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/oauth2', authRouter);

//api user routes
app.use('/api/user',middleware.isAuth, userRouter);

//api habbits routes
app.use('/api/habbits', middleware.isAuth, habbitRouter);

//Handle errors
app.use(middleware.errorHandler);

//Handle unknown request
app.use(middleware.unknownEndpoint);

//start listening
app.listen(PORT, ()=>{
    console.log(`Server is up on ${PORT}`)
});