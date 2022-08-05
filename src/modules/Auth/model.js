const { fetch } = require("../../lib/postgres");

const SELECT_USER = `
    SELECT
        *
    FROM
        users
    WHERE
        user_name = $1
    AND
        user_password = $2
`;

const selectUser = (login, password) => fetch(SELECT_USER, login, password);

module.exports = { selectUser };
