const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const { client } = require("../db/redis");

const limit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 2,
  store: new RedisStore({
    sendCommand: (...args) => client.sendCommand(args),
  }),
});

module.exports = { limit };
