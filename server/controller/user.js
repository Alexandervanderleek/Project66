const {User} = require('../models/User')

exports.getUser = (req, res) => {
    
    const returnedUserObject = {
        name: req.session.passport.user.name,
        email: req.session.passport.user.email,
        picture: req.session.passport.user.picture
    }

    res.status(200).json({user:returnedUserObject});
}

exports.getUserNotes = async (req, res) => {
    
    const notes = await User.findById(req.session.passport.user.id).populate('habbits', {select: '-_id -__v'})

    res.status(200).json({
        notes: notes.habbits
    })
}
