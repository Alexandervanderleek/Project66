const userRouter = require('express').Router();
const userController = require('../controller/user');

//get the user
userRouter.get('/', userController.getUser);

//get the user habbits
userRouter.get('/habbits', userController.getUserHabbits);

//get the user leaderboard
userRouter.get('/leaderboard', userController.getUserLeaderBoard);

//get the user habbits
userRouter.get('/stats', userController.getAllUserHabbits);

userRouter.delete('/delete', userController.deleteUser);

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