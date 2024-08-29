const redis = require('redis');
const {REDISCLOUD_URL, NODE_ENV} = require('../config/config')
//Create our redis client and export it


const redis_url = REDISCLOUD_URL

const redisClient = redis.createClient({
    //password: REDIS_PASSWORD,
    url: NODE_ENV==='production'?redis_url:null,

})

redisClient.on("connect", (message) => {
    console.log("connected redis success");
})

redisClient.on("disconnect", (message) => {
    console.log("disconnected redis");
})

redisClient.on("error", (message) => {
    console.log("redis error occured");
})

module.exports = redisClient;