require('dotenv').config();

//Just a simple config file
const NODE_ENV = process.env.NODE_ENV
const MONGO_URI = process.env.MONGO_URI
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT
const REDIS_SECRET = process.env.REDIS_SECRET
const PORT = process.env.PORT
const GOOGLE_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_ID = process.env.GOOGLE_ID
const GOOGLE_REDIRECT = process.env.GOOGLE_REDIRECT

module.exports = {
    MONGO_URI,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_SECRET,
    PORT,
    GOOGLE_SECRET,
    GOOGLE_ID,
    GOOGLE_REDIRECT
}