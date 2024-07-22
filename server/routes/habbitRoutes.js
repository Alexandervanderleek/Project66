const habbitsRouter = require('express').Router();
const habbitController = require('../controller/habbits')

//Create a new habbit
habbitsRouter.post('/new', habbitController.newHabbit);

//param since not a filtering action
//patch a habbit (only function is to edit if done today)
habbitsRouter.patch('/:id', habbitController.updateHabbit)

//delete a habbit
habbitsRouter.delete('/:id', habbitController.deleteHabbit)

module.exports = habbitsRouter;