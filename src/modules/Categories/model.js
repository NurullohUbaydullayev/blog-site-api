const { fetchAll } = require("../../lib/postgres");

const GET_CATEGORIES = `
    SELECT 
        *
    FROM 
        categories;
`;

const getCategories = () => fetchAll(GET_CATEGORIES);

module.exports = {
  getCategories,
};
