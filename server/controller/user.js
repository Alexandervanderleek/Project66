const User = require('../models/User');


exports.getUser = (req, res, ) => {

    console.log(req.session);
    
    const returnedUserObject = {
        name: req.session.passport.user.name,
        email: req.session.passport.user.email,
        picture: req.session.passport.user.picture
    }

    res.status(200).json({user:returnedUserObject});
}