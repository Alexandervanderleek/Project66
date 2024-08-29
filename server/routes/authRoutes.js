const { NODE_ENV } = require('../config/config');
const authRouter = require('express').Router();
const passport = require('passport');

//google auth router
authRouter.get('/login/google', passport.authenticate("google"));

//redirect google auth
authRouter.get('/redirect/google',passport.authenticate("google",{
    successReturnToOrRedirect: NODE_ENV==="production"? '/redirect/1':'http://localhost:5173/redirect/1',
    failureRedirect: '/redirect/2',
}));

module.exports = authRouter;
