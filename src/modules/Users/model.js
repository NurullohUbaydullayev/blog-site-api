const { fetch } = require("../../lib/postgres");

const CREATE_USER = `INSERT INTO users(user_name, user_password) VALUES($1, $2) RETURNING *`;

const createUser = (name, password) => fetch(CREATE_USER, name, password);

module.exports = { createUser };
