const redis = require('redis');

//Create our redis client and export it

const redisClient = redis.createClient()

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