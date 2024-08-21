require('dotenv').config();

//Just a simple config file
const NODE_ENV = process.env.NODE_ENV
const MONGO_URI = process.env.MONGO_URI
const REDISCLOUD_URL = process.env.REDISCLOUD_URL
//const REDIS_PASSWORD = process.env.REDIS_PASSWORD
const SESSION_SECRET = process.env.SESSION_SECRET
const PORT = process.env.PORT
const GOOGLE_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_ID = process.env.GOOGLE_ID
const GOOGLE_REDIRECT = process.env.GOOGLE_REDIRECT

module.exports = {
    NODE_ENV,
    MONGO_URI,
    REDISCLOUD_URL,
    //REDIS_PASSWORD,
    SESSION_SECRET,
    PORT,
    GOOGLE_SECRET,
    GOOGLE_ID,
    GOOGLE_REDIRECT
}