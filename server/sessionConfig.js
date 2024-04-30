const { generateSessionSecret } = require("./utils/random");
const uuid = require("uuid");
require("dotenv").config();

module.exports = {
  secret: process.env.SESSION_SECRET || generateSessionSecret(),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
  genid: () => uuid.v4(),
};
