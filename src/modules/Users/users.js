const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config/config");
const { createUser } = require("./model");

module.exports = {
  SIGNUP: async (req, res) => {
    try {
      const { userName, userPassword } = req.body;

      const newUser = await createUser(userName, userPassword);

      if (newUser) {
        const userToken = jwt.sign(newUser, SECRET_KEY);
        res.send({ token: userToken });
      } else {
        res.status(400).json({ message: "Username has already exist" });
      }
    } catch (err) {
      console.log(err.detail === "Key (user_name)=(user) already exists.");
      if (err.detail === "Key (user_name)=(user) already exists.") {
        console.log("Users => [signup]: ", err.detail);
        res.status(400).json({ message: "Username has already exist" });
      } else {
        console.log("Users => [signup]: ", err.detail);
        res.status(401).json({ message: "Bad request" });
      }
    }
  },
};
