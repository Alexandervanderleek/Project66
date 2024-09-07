const { NODE_ENV } = require('../config/config');
const authRouter = require('express').Router();
const passport = require('passport');

//google auth router
authRouter.get('/login/google', passport.authenticate("google"));

//redirect google auth
authRouter.get('/redirect/google',passport.authenticate("google",{
    //session: false,
    successReturnToOrRedirect: '/',
    failureRedirect: '/redirect/2',
    failureMessage: true
}));

module.exports = authRouter;
