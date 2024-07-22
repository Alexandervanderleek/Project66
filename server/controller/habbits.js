const Habbit = require('../models/habbit');
const {User} = require('../models/User');
const { InternalError } = require('../util/customErrors');

//Create a new habbit for a authenticated user
exports.newHabbit = async (req, res) => {
    try{
        const id = req.session.passport.user.id;
        const {title, description, icon, start, expire} = req.body;

        const newHabbit = new Habbit({
            title: title,
            description: description,
            icon: icon,
            Days: 0,
            start: start,
            expire: expire,
            user: id
        });

        const createdHabbit = await newHabbit.save();

        await User.updateOne({ _id: id }, { $push: { habbits: createdHabbit._id } });

        res.sendStatus(200);
    
    }catch(err){
         throw new InternalError("Could not create Habbit "+ err)
    }
}

//update a habbit, only used to mark as complete 
exports.updateHabbit = async (req, res) => {
    try{
        const oldHabbit = await Habbit.findById(req.params.id);

        await Habbit.findByIdAndUpdate(req.params.id,{
            start: oldHabbit.expire,
            expire: new Date(oldHabbit.expire.getTime() + 24 * 60 * 60 * 1000)
        })

        res.sendStatus(200);

    }catch(err){
        throw new InternalError("failed to update habbit "+err)

    }
}

//deltete a habbit
exports.deleteHabbit = async (req, res) => {
    try{
        await Habbit.findByIdAndDelete(req.params.id);

        res.sendStatus(200);

    }catch(err){
        throw new InternalError("failed to delete habbit "+err);
    }
}

