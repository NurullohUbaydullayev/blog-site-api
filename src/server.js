const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const router = require("./modules/routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(
  config.PORT,
  console.log("Server is running on port: " + config.PORT)
);
