require('dotenv').config();

//Just a simple config file

const MONGO_URI = process.env.MONGO_URI
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT
const REDIS_SECRET = process.env.REDIS_SECRET
const PORT = process.env.PORT

module.exports = {
    MONGO_URI,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_SECRET,
    PORT
}