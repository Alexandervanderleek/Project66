const Habbit = require('../models/habbit');
const {User} = require('../models/User');
const { InternalError, UserError } = require('../util/customErrors');

//Create a new habbit for a authenticated user
exports.newHabbit = async (req, res,next) => {
    try{
        const id = req.session.passport.user.id;
        const {title, description, icon, start, expire} = req.body;


        Habbit.countDocuments({
            user: id
        }).then(async (count)=>{
            
            
            if(count>=8){
                throw new UserError("Too many active habbits")
            }
    
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
    
            await User.updateOne({ _id: id }, { $push: { habbits:  createdHabbit._id } });
    
            res.status(200).json({createdHabbit});
    
        }).catch((err)=>{
            next(err)
        })

    
    
    }catch(err){
         //throw new InternalError("Could not create Habbit "+ err)
        next(err)
    }
}

//update a habbit, only used to mark as complete 
exports.updateHabbit = async (req, res) => {
    try{
        const oldHabbit = await Habbit.findById(req.params.id);
        const newDays = oldHabbit.Days+1

        const updatedHabbit = await Habbit.findByIdAndUpdate(req.params.id, {
            start: oldHabbit.expire,
            expire: new Date(oldHabbit.expire.getTime() + 24 * 60 * 60 * 1000),
            Days: newDays
        },{
            new: true
        })

        res.status(200).json({updatedHabbit});

    }catch(err){
        next(new InternalError("failed to update habbit "+err))

    }
}

//deltete a habbit
exports.deleteHabbit = async (req, res) => {
    try{
       const response = await Habbit.findByIdAndDelete(req.params.id);
        
        await User.updateOne({ _id: response.user }, { $pull: { habbits: response._id } });

        res.sendStatus(200);

    }catch(err){
         next(new InternalError("failed to delete habbit "+err));
    }
}

exports.deleteAllHabbits = async (req, res) => {
    
    try{
        const userId = req.session.passport.user.id;
        const ids = (await User.findById(userId)).habbits;

        ids.forEach(async (id)=>{
            await Habbit.findByIdAndDelete(id);
        })

        res.sendStatus(200);

    }catch(err){
        next(new InternalError("could not delete errors"+err))
    }
}

