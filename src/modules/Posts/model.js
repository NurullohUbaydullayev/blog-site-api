const { fetch, fetchAll } = require("../../lib/postgres");

const READ_POSTS = `
  SELECT 
    posts.id AS id,
    posts.title AS title,
    posts.category_name AS category_name,
    posts.created_at AS created_time
  FROM 
    posts
  INNER JOIN categories cat ON cat.category_name = posts.category_name
  ORDER BY
    created_at DESC
  LIMIT 10 OFFSET $1;
`;

const GET_POSTS_BY_CATEGORY = `
  SELECT 
    posts.id AS id,
    posts.title AS title,
    posts.category_name AS category_name,
    posts.created_at AS created_time
  FROM 
    posts
  INNER JOIN categories cat ON cat.category_name = posts.category_name
  WHERE cat.category_name = $1
  ORDER BY
    created_at DESC
  LIMIT 10 OFFSET $2;
`;

const GET_SINGLE_POST = `
  SELECT
    *
  FROM 
    posts
  WHERE id = $1;
`;

const GET_POSTS_LENGTH = `
  SELECT
    COUNT(*)
  FROM
    posts;
`;

const CREATE_POST = `
    INSERT INTO posts(user_id, category_name, title, main_image_url, body) 
    VALUES($1, $2, $3, $4, $5) RETURNING *;
`;

const UPDATE_TODO = `
    UPDATE posts
    SET category_name = $2,
        main_image_url = $3,
        title = $4,
        body = $5
    WHERE id = $1
    RETURNING *;
`;

const DELETE_TODO = `
    DELETE FROM posts
    WHERE id = $1;
`;

const SEARCH_POST = `
  SELECT
    *
  FROM
    posts
  WHERE
    title ILIKE $1;
`;

const readPosts = (offset) => fetchAll(READ_POSTS, offset);
const getPostsLength = () => fetch(GET_POSTS_LENGTH);
const getPostsByCategory = (categoryName, offset) =>
  fetchAll(GET_POSTS_BY_CATEGORY, categoryName, offset);
const getSinglePost = (id) => fetch(GET_SINGLE_POST, id);
const createPost = (userId, categoryName, postTitle, imageUrl, postBody) =>
  fetch(CREATE_POST, userId, categoryName, postTitle, imageUrl, postBody);
const updatePost = (postId, categoryName, imageUrl, title, body) =>
  fetch(UPDATE_TODO, postId, categoryName, imageUrl, title, body);
const deletePost = (postId) => fetch(DELETE_TODO, postId);
const searchPost = (value) => fetchAll(SEARCH_POST, "%" + value + "%");

module.exports = {
  readPosts,
  getPostsLength,
  getSinglePost,
  getPostsByCategory,
  createPost,
  updatePost,
  deletePost,
  searchPost,
};
