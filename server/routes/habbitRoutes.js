const habbitsRouter = require('express').Router();
const habbitController = require('../controller/habbits')

habbitsRouter.post('/new', habbitController.newHabbit);


module.exports = habbitsRouter;