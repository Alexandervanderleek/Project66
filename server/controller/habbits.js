const Habbit = require('../models/habbit');
const { InternalError } = require('../util/customErrors');

exports.newHabbit = async (req, res,next) => {
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

        res.status(200);
    
    }catch(err){
         throw new InternalError("Could not create Habbit "+ err)
    }
}