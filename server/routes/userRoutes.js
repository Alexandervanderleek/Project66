const userRouter = require('express').Router();
const userController = require('../controller/user');

userRouter.get('/', userController.getUser);

userRouter.get('/habbits', userController.getUserHabbits);




module.exports = userRouter;