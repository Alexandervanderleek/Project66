const mongoose = require('mongoose');
const habbit = require('./habbit');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true,'need a name'], 
    },
    email:{
        type: String,
        required: [true,'need a email'],
        unique: [true,'need a unique email'],
    },
    completed:{
        type: Number,
        default: 0
    },
    picture:{
        type: String
    },
    //array of reference to habbits
    habbits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Habbit'
        }
    ]
},{
    timestamps: true
});

userSchema.pre('deleteOne', async function (next){
    
    try {
        await Habbit.deleteMany({user: this._conditions._id})        
    } catch (error) {
        console.log(error)
    }

    next();

})

//How toJson for user db object
userSchema.set('toJSON', {
    transform: (document, returnedObject ) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("User", userSchema);
