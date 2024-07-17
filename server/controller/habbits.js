const Habbit = require('../models/habbit');
const { InternalError } = require('../util/customErrors');

exports.newHabbit = async (req, res) => {
    try{
        const id = req.session.passport.user.id;
        const {title, description, icon, days, start, expire} = req.body;

        const newHabbit = new Habbit({
            title: title,
            description: description,
            icon: icon,
            Days: days,
            start: start,
            expire: expire,
            user: id
        });

        const createdHabbit = await newHabbit.save();
        
        console.log(createdHabbit);

        res.sendStatus(200);
    
    }catch(err){
         throw new InternalError("Could not create Habbit "+ err)
    }
}

exports.updateHabbit = async (req, res) => {
    try{
        //res.json({message:req.params.id})

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

