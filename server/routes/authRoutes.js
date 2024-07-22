const authRouter = require('express').Router();
const passport = require('passport');

//google auth router
authRouter.get('/login/google', passport.authenticate("google"));

//redirect google auth
authRouter.get('/redirect/google',passport.authenticate("google",{
    successReturnToOrRedirect: 'http://localhost:5173/redirect/1',
    failureRedirect: 'http://localhost:5173/redirect/2',
}));

module.exports = authRouter;
