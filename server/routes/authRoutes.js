const authRouter = require('express').Router();
const passport = require('passport');
const { UserError, InternalError } = require('../util/customErrors');


authRouter.get('/login/google', passport.authenticate("google"));

authRouter.get('/redirect/google',passport.authenticate("google",{
    successReturnToOrRedirect: 'http://localhost:5173/redirect/1',
    failureRedirect: 'http://localhost:5173/redirect/2',
}));

authRouter.get('/logout', (req, res) => {
    try{
        req.session.destroy();
        res.sendStatus(200);
    }catch(error){
        throw new InternalError("Could not destroy user session "+error);
    }
})


module.exports = authRouter;
