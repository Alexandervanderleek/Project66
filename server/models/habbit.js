const mongoose = require('mongoose');

const habbitSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,'Need a habbit title'],
        maxlength: [100,'Description too long']
    },
    description:{
        type: String,
        required: [true, 'Need a description'],
        maxlength: [300, 'Description too long']
    },
    icon:{
        type: String,
        required: [true, 'Need a icon']
    },
    Days:{
        type: Number,
        max: [66, 'Number too large'],
        min: [0,'Number too small']
    },
    start:{
        type: Date,
        required: [true, 'Need start time'],
    },
    expire:{
        type: Date,
        required: [true, 'Need expire time'],
        validate:{
            validator: function(value){
                return value > this.start;
            },
            message: 'Invalid time data'
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
   toJSON: {virtuals: true},
   toObject: {virtuals: true}
});


habbitSchema.virtual('today').get(function(){

    const myDate = new Date();

    return this.start <= myDate && myDate <= this.expire;
});

habbitSchema.virtual('status').get(()=>{
    if(new Date() > this.expire){
        return 'failed';
    }
    if(this.days === 66){
        return 'complete'
    }
    return 'progress'
});



habbitSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.user
    }
})


module.exports = mongoose.model('Habbit',habbitSchema);