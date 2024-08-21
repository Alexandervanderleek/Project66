const authRouter = require('express').Router();
const passport = require('passport');

//google auth router
authRouter.get('/login/google', passport.authenticate("google"));

//redirect google auth
authRouter.get('/redirect/google',passport.authenticate("google",{
    successReturnToOrRedirect: '/redirect/1',
    failureRedirect: '/redirect/2',
}));

module.exports = authRouter;
