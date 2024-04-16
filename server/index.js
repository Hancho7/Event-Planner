const express = require("express");
const cors = require("cors");
require("dotenv").config();

const signUprouter = require('./routes/clientLogs') 

const app = express();

app.use('/clients', signUprouter)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
