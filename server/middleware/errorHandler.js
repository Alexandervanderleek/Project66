const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, req, res, next) => {
   
    if(error.name === "SERVER"){
        console.error(error.message);
        return res.status(500).json({error:"Internal Server Error"});

    } else if (error.name === "USER"){
        return res.status(400).json({error: error.message});

    }

    next(error);
}

module.exports = {errorHandler, unknownEndpoint}