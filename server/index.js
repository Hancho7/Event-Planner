const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes");
const session = require("./middleware/session");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session);

app.use(routes);

const PORT = process.env.PORT || 5001;


  app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
  });

