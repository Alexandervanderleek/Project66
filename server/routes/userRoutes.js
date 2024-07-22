const userRouter = require('express').Router();
const userController = require('../controller/user');

//get the user
userRouter.get('/', userController.getUser);

//get the user habbits
userRouter.get('/habbits', userController.getUserHabbits);

//logout a user i.e destroy our session
userRouter.get('/logout', (req, res) => {
    try{
        req.session.destroy();
        res.sendStatus(200);
    }catch(error){
        throw new InternalError("Could not destroy user session "+error);
    }
})

module.exports = userRouter;