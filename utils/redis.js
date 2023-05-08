const redis = require('redis');
const { REDIS_PORT } = require('../config');

const client = redis.createClient({
    url: `redis://redis:${REDIS_PORT}`
});

client
    .connect()
    .then(async () => {
        console.log("Redis client connected successfully!")
})
    .catch((err) => {
        console.log("Redis client error, cached responses won't respond", err)
});

module.exports = client;