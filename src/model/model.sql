CREATE DATABASE todolist;

SET timezone = 'Asia/Tashkent';

CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_name varchar(46) NOT NULL UNIQUE,
    user_password varchar(60) NOT NULL
);

INSERT INTO users(user_name, user_password) VALUES('Nurulloh', 'nur2004ub14');

CREATE TABLE categories(
    id uuid DEFAULT uuid_generate_v4(),
    category_name varchar(40) DEFAULT 'All' UNIQUE PRIMARY KEY
);

INSERT INTO categories(category_name) VALUES('Design Theory');
INSERT INTO categories(category_name) VALUES('Typography');

CREATE TABLE posts(
    id serial,
    user_id uuid,
    category_name text,
    main_image_url text DEFAULT 'https://source.unsplash.com/352x300',
    title varchar(150) NOT NULL,
    body text not null,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    FOREIGN KEY(category_name)
        REFERENCES categories(category_name)
        ON DELETE CASCADE
);

INSERT INTO posts(user_id, category_name, title, main_image_url, body) VALUES('953670e8-67c0-4fbf-abec-96d51140239a', 'https://source.unsplash.com/352x300', 'Typography', 'Typography`ga doir maqola', 'Typography`ga doir maqola lorem ipsum dolor sit amet!');

-- Joins for display posts of single user related to the given category name

SELECT 
    posts.id AS id,
    posts.title AS title,
    posts.category_name AS category_name,
    posts.main_image_url AS poster_img,
    posts.body AS body,
    posts.created_at AS created_time
FROM 
    posts
INNER JOIN categories cat ON cat.category_name = posts.category_name
WHERE cat.category_name = 'Design Theory';

SELECT 
    posts.id AS id,
    posts.title AS title,
    posts.category_name AS category_name,
    posts.created_at AS created_time
FROM 
    posts
INNER JOIN categories cat ON cat.category_name = posts.category_name
WHERE cat.category_name = 'Design Theory'
ORDER BY
	created_at DESC
LIMIT 10 OFFSET 0;

-- SELECT to show single post

SELECT
    *
FROM 
    posts
WHERE id = '1';

-- Select all posts

SELECT 
    *
FROM posts;

-- 

SELECT
	*
FROM
	posts
ORDER BY
	created_at DESC
LIMIT 10 OFFSET 0;

-- 

SELECT
   COUNT(*)
FROM
   posts;

-- Search all post related to the searching value

SELECT
	*
FROM
	posts
WHERE
	title ILIKE '%ux%';

-- Update post

UPDATE posts
SET category_name = 'All',
    main_image_url = 'https://source.unsplash.com/352x300',
    title = 'Title',
    body = 'Body'
WHERE id = '1';

-- Delete post

DELETE FROM posts
WHERE id = '1';