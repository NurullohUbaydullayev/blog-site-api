const { Router } = require("express");

const router = new Router();

const Users = require("./Users/users");
const Auth = require("./Auth/auth");
const Posts = require("./Posts/posts");

router
  .post("/signup", Users.SIGNUP)
  .get("/login", Auth.LOGIN)
  .get("/posts", Posts.READ)
  .get("/posts/search", Auth.VERIFICATION, Posts.SEARCH)
  .get("/posts/:postId", Posts.GET_SINGLE_POST)
  .post("/posts", Auth.VERIFICATION, Posts.CREATE)
  .put("/posts/:id", Auth.VERIFICATION, Posts.UPDATE)
  .delete("/posts/:id", Auth.VERIFICATION, Posts.DELETE);

module.exports = router;
