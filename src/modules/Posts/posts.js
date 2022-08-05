const {
  readPosts,
  getPostsLength,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  searchPost,
} = require("./model");
const { SECRET_KEY } = require("../../config/config");
const jwt = require("jsonwebtoken");

const { selectUser } = require("../Auth/model");

const findUser = async (header) => {
  const { token } = header;
  const { user_name, user_password } = jwt.verify(token, SECRET_KEY);
  const foundUser = await selectUser(user_name, user_password);
  return foundUser;
};

module.exports = {
  READ: async (req, res) => {
    try {
      const { page } = req.query;
      const posts = await readPosts(page * 10);
      const postsLength = await getPostsLength();
      res.send({ length: postsLength, posts: posts });
    } catch (err) {
      console.log("Todos => [READ]: ", err.message);
      res.status(500).json({ message: "SERVER error" });
    }
  },
  GET_SINGLE_POST: async (req, res) => {
    try {
      const { id } = req.params;
      const singlePost = await getSinglePost(id);
      if (singlePost) res.send(singlePost);
      else res.status(404).send({ message: "Not found" });
    } catch (err) {
      console.log("Todos => [GET_SINGLE_POST]: ", err.message);
      res.status(500).json({ message: "SERVER error" });
    }
  },
  CREATE: async (req, res) => {
    try {
      const { userId, categoryName, title, imageUrl, body } = req.body;
      const newPost = await createPost(
        userId,
        categoryName,
        title,
        imageUrl,
        body
      );
      res.status(200).json(newPost);
    } catch (err) {
      console.log("Todos => [CREATE]: ", err.message);
      res.status(400).json({ message: "Bad Request" });
    }
  },
  UPDATE: async (req, res) => {
    try {
      const { id } = req.params;
      const { categoryName, imageUrl, title, body } = req.body;
      const modifiedTodo = await updatePost(
        id,
        categoryName,
        imageUrl,
        title,
        body
      );
      if (!modifiedTodo) {
        res.status(400).json({ message: "Bad Request" });
        return;
      }
      res.status(200).json(modifiedTodo);
    } catch (err) {
      console.log("Todos => [UPDATE]: ", err.message);
      res.status(400).json({ message: "Bad Request" });
    }
  },
  DELETE: async (req, res) => {
    try {
      const { id } = req.params;
      await deletePost(id);
      res.status(200).json({ message: "Successful!" });
    } catch (err) {
      console.log("Todos => [DELETE]: ", err.message);
      res.status(400).json({ message: "Bad Request" });
    }
  },
  SEARCH: async (req, res) => {
    try {
      const { searchValue } = req.body;
      const foundPosts = await searchPost(searchValue);
      res.status(200).json(foundPosts);
    } catch (err) {
      console.log("Todos => [SEARCH]: ", err.message);
      res.status(400).json({ message: "Bad Request" });
    }
  },
};
