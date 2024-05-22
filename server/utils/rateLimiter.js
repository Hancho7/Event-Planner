// utils/rateLimiter.js
const { RateLimiterRedis } = require("rate-limiter-flexible");
const { client } = require("./redis");

const createRateLimiter = (points, duration) => {
  const rateLimiter = new RateLimiterRedis({
    storeClient: client,
    keyPrefix: "rateLimiter",
    points, // Number of points
    duration, // Per duration in seconds
  });

  // Middleware to handle rate limiting
  return (req, res, next) => {
    rateLimiter
      .consume(req.ip)
      .then(() => {
        next();
      })
      .catch((rejRes) => {
        res.status(429).send("Too Many Requests");
      });
  };
};

module.exports = { createRateLimiter };
