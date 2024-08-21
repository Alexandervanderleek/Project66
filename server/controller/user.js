const User = require('../models/user');
const { InternalError } = require('../util/customErrors');

//Get user information for current session
exports.getUser = (req, res) => {

    //console.log("getting user")

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
    
    const now = new Date();

    const habbits = await User.findById(req.session.passport.user.id).populate({
        path: 'habbits',
        match: {
            expire: {$gte: now },
            Days: {$lt: 66}
        },
        options: {
            limit: 10,
            sort:{
                start: -1
            }
        }
    }).catch((err)=>{
        new InternalError('Error getting user habbits');
    })

    const completeFailedhabbits = await User.findById(req.session.passport.user.id).populate({
        path: 'habbits',
        match: {
            $or: [
                {Days:{$eq:66}},
                {expire:{$lte:now}},
            ]
        },
        options: {
            limit: 10,
            sort:{
                start: -1
            }
            
        }
    }).catch((err)=>{
        new InternalError('Error getting user habbits');
    })


    res.status(200).json({
        habbits: habbits.habbits.concat(completeFailedhabbits.habbits)
    })
}



//Get all the users habbits
exports.getAllUserHabbits = async (req, res) => {
    
    const now = new Date();

    //console.log("get all")

    const completeFailedhabbits = await User.findById(req.session.passport.user.id).populate({
        path: 'habbits',
        match: {
            $or: [
                {Days:{$eq:66}},
                {expire:{$lte:now}},
            ]
        },
        options: {
            sort:{
                start: -1
            }
        }
    }).catch((err)=>{
        console.log(err)
        new InternalError('Error getting user habbits');
    })


    

    res.status(200).json({
        habbits: completeFailedhabbits.habbits
    })
}


