const session = require('express-session');
const redisClient = require('../database/redis');
const { default: RedisStore } = require('connect-redis');
const {REDIS_SECRET, NODE_ENV} = require('../config/config')

//Connect the redis client

redisClient.connect().catch((err)=>console.log("something went wrong"))

//Create the redis store that uses express session, 1 day default ttl

const redisStore = new RedisStore({
    client: redisClient,
    prefix: '66',
    ttl: 24 * 60 * 60 * 1000
});



//export resulting session from express-session

const sesh = session({
   store: redisStore,
   resave: false,
   saveUninitialized: false,
   secret: REDIS_SECRET,
   rolling: true,
   cookie: {
    secure: NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
   }
 });

 module.exports = {sesh, redisStore}