/*
Simple class for throwing errors, internal not exposed to user
in the error handling middleware while ueser errors are sent
*/

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