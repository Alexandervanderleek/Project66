const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        require: true, 
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    picture:{
        type: String
    },
    habbits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Habbit'
        }
    ]
},{
    timestamps: true
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject ) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


exports.User = mongoose.model("User", UserSchema);
