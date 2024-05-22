const { createClient } = require("redis");
require("dotenv").config();

const client = createClient();

client.on("error", (err) => {
  console.error("Redis error: ", err);
});

client.connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.error("Could not connect to Redis:", err);
  });

module.exports = { client };
