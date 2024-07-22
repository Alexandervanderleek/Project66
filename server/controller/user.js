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

//Get all the users habbits
exports.getUserHabbits = async (req, res) => {
    
    const habbits = await User.findById(req.session.passport.user.id).populate({
        path: 'habbits',
        options: {virtuals: true}
    }).catch((err)=>{
        new InternalError('Error getting user habbits');
    })

    res.status(200).json({
        habbits: habbits.habbits
    })
}

