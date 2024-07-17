const { UserError } = require("../util/customErrors");

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, req, res, next) => {

   
    if(error.name === "INTERNAL"){
        console.error(error.message);
                
        return res.status(500).json({error:"Internal Server Error"});



    } else if (error.name === "USER"){
        return res.status(400).json({error: error.message});

    }

    next(error);
}

const isAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    }
    else{
       throw new UserError("Not Authenticated")
        
    }
}

module.exports = {errorHandler, unknownEndpoint, isAuth}