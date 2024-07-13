const {MONGO_URI} = require('../config/config')
const mongoose = require("mongoose")

//Export function that connects to the MONGODB database
//Nothing special

module.exports = () => {

    mongoose.connect(MONGO_URI).then(()=>{
        console.log("Succesfully Connected To Mongo")
    }).catch((err)=>{
        console.log("Error connecting to Mongo -",err)
    });

    mongoose.connection.on("disconnected", ()=>{
        console.log("Default conntection disconnected mongoose")
    })

}