const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config/config");
const { selectUser } = require("./model");

module.exports = {
  LOGIN: async (req, res) => {
    try {
      const { login, password } = req.query;
      const foundUser = await selectUser(login, password);
      if (foundUser) {
        const token = jwt.sign(foundUser, SECRET_KEY);
        res.send({ token });
      } else {
        res.status(400).json({ message: "Login or password is incorrect" });
      }
    } catch (err) {
      console.log("Auth => [login]: ", err.message);
      res.status(401).json({ message: "Bad request" });
    }
  },
  VERIFICATION: async (req, res, next) => {
    try {
      const { token } = req.headers;
      const { user_name, user_password } = jwt.verify(token, SECRET_KEY);
      const foundUser = await selectUser(user_name, user_password);
      if (foundUser) {
        req.body.userId = foundUser.id;
        return next();
      } else {
        res.status(401).send({ message: "Bad request!" });
      }
    } catch (err) {
      console.log("Auth => [VERIFICATION]: ", err);
      res.status(500).json({ message: "Something is wrong" });
    }
  },
};
