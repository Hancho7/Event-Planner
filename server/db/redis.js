const { createClient } = require("redis");
require("dotenv").config();

const client = createClient({
  password: "jXYJwXpW7yhhHGQB3k2VUs0waCIEi8Fj",
  socket: {
    host: "redis-18997.c11.us-east-1-3.ec2.redns.redis-cloud.com",
    port: 18997,
  },
});

client.on("error", (err) => {
  console.error("Redis error: ", err);
});

client
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.error("Could not connect to Redis:", err);
  });

module.exports = { client };
