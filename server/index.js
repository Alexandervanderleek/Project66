require('./database/db')();
const {PORT, NODE_ENV} = require('./config/config')
const {sesh} =  require('./util/session');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('express-async-errors')
require('./util/passportGoogle');
const middleware = require('./middleware/middleware');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const habbitRouter = require('./routes/habbitRoutes');
const path = require('path')
const rateLimit =  require('express-rate-limit');
const expressStaticGzip = require('express-static-gzip');

//
const app = express();

app.set('trust proxy', 1); // trust first proxy    

const limit = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
})

app.use(limit);

app.use(expressStaticGzip(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname,'dist')))


//just cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


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

//auth routes
app.use('/oauth2', authRouter);

//api user routes
app.use('/api/user',middleware.isAuth, userRouter);

//api habbits routes
app.use('/api/habbits', middleware.isAuth, habbitRouter);

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

//Handle errors
app.use(middleware.errorHandler);

//Handle unknown request
app.use(middleware.unknownEndpoint);

//start listening
app.listen(PORT, ()=>{
    console.log(`Server is up on ${PORT}`)
});