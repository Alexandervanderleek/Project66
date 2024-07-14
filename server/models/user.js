const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        require: true 
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    googleId:{
        type: String,
        require: true,
        unique: true
    },
    picture:{
        type: String
    }
},{
    timestamps: true
})


exports.User = mongoose.model("user", UserSchema);
