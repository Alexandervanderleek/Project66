const User = require('../models/user');
const { InternalError } = require('../util/customErrors');

//Get user information for current session
exports.getUser = (req, res) => {

    //console.log("getting user")
    if(!req.session.passport.user){new InternalError('Something went wrong with user req')}

    const returnedUserObject = {
        name: req.session.passport.user.name,
        //email: req.session.passport.user.email,
        completed: req.session.passport.user.completed,
        picture: req.session.passport.user.picture
    }

    res.status(200).json({user:returnedUserObject});
}

//Get all the users habbits
exports.getUserHabbits = async (req, res) => {
    
    const dateTime = new Date();
    var now_utc = Date.UTC(dateTime.getUTCFullYear(), dateTime.getUTCMonth(),
    dateTime.getUTCDate(), dateTime.getUTCHours(),
    dateTime.getUTCMinutes(), dateTime.getUTCSeconds());

    const now = new Date(now_utc);

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
    
    const dateTime = new Date();
    var now_utc = Date.UTC(dateTime.getUTCFullYear(), dateTime.getUTCMonth(),
    dateTime.getUTCDate(), dateTime.getUTCHours(),
    dateTime.getUTCMinutes(), dateTime.getUTCSeconds());

    const now = new Date(now_utc);

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

exports.getUserLeaderBoard = async (req, res) => {
    //console.log("gettitng leaderboard")
    try{
        //query, projection, options
        const leaderBoard = await User.find({},{completed:1,name:1},{limit: 30,sort:{completed: -1}});
        
        // const currentUser = await User.findById(req.session.passport.user.id, { completed: 1 });

        const userPosition = await User.countDocuments({completed: {$gt: req.session.passport.user.completed}})+1;
        
        res.status(200).json({
            position: userPosition,
            leaderboard: leaderBoard
        })

        // res.status(200).json({
        //     l:leaderBoard,
        //     u:userPosition
        // });
    }catch(err){
        console.log(err)
        throw new InternalError('Error getting leaderboard');
    }
}

//Get user information for current session
exports.deleteUser = async (req, res) => {
    try{
        //req.session.passport.user.id
        await User.deleteOne({_id:req.session.passport.user.id})
        req.session.destroy();
        
        res.sendStatus(200);
    }catch(error){
        throw new InternalError("Could not destroy user session "+error);
    }
}

