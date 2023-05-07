const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
    max: 100,
    windowMS: 5 * 60 * 1000,
    message: "You can't make any more requests at this moment. Please try again later.",
});
    
module.exports = limiter