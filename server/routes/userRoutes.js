const userRouter = require('express').Router();
const userController = require('../controller/user');

userRouter.get('/', userController.getUser);

userRouter.get('/notes', userController.getUserNotes);



module.exports = userRouter;