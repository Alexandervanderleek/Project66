const session = require('express-session');
const redisClient = require('../database/redis');
const { default: RedisStore } = require('connect-redis');
const {REDIS_SECRET} = require('../config/config')

//Connect the redis client

redisClient.connect().catch((err)=>console.log("something went wrong"))

//Create the redis store that uses express session, 1 day default ttl

let redisStore = new RedisStore({
    client: redisClient,
    prefix: '66'
})

//export resulting session from express-session

module.exports = session({
   store: redisStore,
   resave: false,
   saveUninitialized: false,
   secret: REDIS_SECRET
 });