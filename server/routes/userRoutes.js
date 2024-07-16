const userRouter = require('express').Router();
const userController = require('../controller/user');

userRouter.get('/', userController.getUser);





module.exports = userRouter;