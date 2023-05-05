const url = require('url');

const redisClient = require('../utils/redis');

const cache = async (req, res, next) => {
    const cacheKey = url.parse(req.originalUrl).pathname;
    req.cacheKey = cacheKey;
    const cache = await redisClient.get(cacheKey)
    if (cache !== null ) {
        const data = JSON.parse(cache);
        return res.status(200).json( data );
    };
    next();
};

module.exports = cache;