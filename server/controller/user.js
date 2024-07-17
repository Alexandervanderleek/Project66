const {User} = require('../models/User');
const { InternalError } = require('../util/customErrors');

//Get user information for current session
exports.getUser = (req, res) => {

    if(!req.session.passport.user){new InternalError('Something went wrong with user req')}

    const returnedUserObject = {
        name: req.session.passport.user.name,
        email: req.session.passport.user.email,
        picture: req.session.passport.user.picture
    }

    res.status(200).json({user:returnedUserObject});
}

//Get all the users notes
exports.getUserNotes = async (req, res) => {
    
    const notes = await User.findById(req.session.passport.user.id).populate('habbits', {select: '-_id -__v'}).catch((err)=>{
        new InternalError('Error getting user notes');
    })

    res.status(200).json({
        notes: notes.habbits
    })
}
