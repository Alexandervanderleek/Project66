class UserError extends Error {
    constructor(message){
        super(message);
        this.name = 'USER';
    }
}

class InternalError extends Error {
    constructor(message){
        super(message);
        this.name = 'INTERNAL';
    }
}

module.exports = {
    UserError,
    InternalError
}