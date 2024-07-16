const authRouter = require('express').Router();
const passport = require('passport');


authRouter.get('/login/google', passport.authenticate("google"));

authRouter.get('/redirect/google',passport.authenticate("google",{
    successReturnToOrRedirect: 'http://localhost:5173/home',
    failureRedirect: '/login/fail',
}));


module.exports = authRouter;
