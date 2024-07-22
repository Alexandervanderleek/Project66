const mongoose = require('mongoose');

const habbitSchema = new mongoose.Schema({
    //habbits title
    title:{
        type: String,
        required: [true,'Need a habbit title'],
        maxlength: [100,'Description too long']
    },
    //habbits description
    description:{
        type: String,
        required: [true, 'Need a description'],
        maxlength: [300, 'Description too long']
    },
    //icon we are going to use
    icon:{
        type: String,
        required: [true, 'Need a icon']
    },
    //Days we have completed
    Days:{
        type: Number,
        max: [66, 'Number too large'],
        min: [0,'Number too small']
    },
    //start time current window
    start:{
        type: Date,
        required: [true, 'Need start time'],
    },
    //expire time current window
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
    //mongoose ref for user object
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    //want virtual to be populated
   toJSON: {virtuals: true},
   toObject: {virtuals: true}
});


//define today virtual [returns if we are indeed in the current window]
habbitSchema.virtual('today').get(function(){

    const myDate = new Date();

    return this.start <= myDate && myDate <= this.expire;
});

//status of the habbit 
//past expire then failed
//days==66 complete
//otherwise it is active
habbitSchema.virtual('status').get(function (){
    if(new Date() > this.expire){
        return 'failed';
    }
    if(this.days === 66){
        return 'complete'
    }
    return 'active'
});

//defines the toJson format for habbits
habbitSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.user
    }
})


module.exports = mongoose.model('Habbit',habbitSchema);