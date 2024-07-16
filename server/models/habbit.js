const mongoose = require('mongoose');

const habbitSchema = new mongoose.Schema({
    title:{
        type: String,
        require: [true,'Need a habbit title'],
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = mongoose.model('Habbit',habbitSchema);