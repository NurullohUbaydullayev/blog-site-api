const { getCategories } = require("./model");

module.exports = {
  GET_CATEGORIES: async (req, res) => {
    try {
      const categories = await getCategories();
      res.send(categories);
    } catch (err) {
      console.log("Categories => [GET_CATEGORIES]: ", err.message);
      res.status(500).json({ message: "SERVER error" });
    }
  },
};
