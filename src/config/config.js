require("dotenv").config();

module.exports = {
  POSTGRES_CONNECTION_STRING: process.env.CONNECTION_STRING,
  PORT: process.env.PORT,
  SECRET_KEY: process.env.JWT_KEY,
};
