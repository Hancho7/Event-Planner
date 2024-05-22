const RedisStore = require("connect-redis").default;
const session = require("express-session");
const { client } = require("../db/redis");
const { generateSessionSecret } = require("../utils/random");
const uuid = require("uuid");
require("dotenv").config();

module.exports = session({
  store: new RedisStore({ client: client }),
  secret: process.env.SESSION_SECRET || generateSessionSecret(),
  resave: false,
  saveUninitialized: false,
  name: "sessionId",
  cookie: {
    maxAge: 60000,
    httpOnly: true,
    secure: false,
  },
  genid: () => uuid.v4(),
});
