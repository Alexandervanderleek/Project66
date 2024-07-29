const { UserError } = require("../util/customErrors");

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

//error handler middleware
const errorHandler = (error, req, res, next) => {

    //if we have a internal error
    if(error.name === "INTERNAL"){
        return res.status(500).json({error:"Internal Server Error"});
        //if we have a user error
    } else if (error.name === "USER"){
        if (error.message === "AUTH"){
            return res.status(204);
        }
        return res.status(400).json({error: error.message});
    }
}

//check for session that isAuthenticated
const isAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    }
    else{
       throw new UserError("AUTH")
    }
}

module.exports = {errorHandler, unknownEndpoint, isAuth}