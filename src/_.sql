DROP TABLE IF EXISTS account;
CREATE TABLE account(
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR (50) NOT NULL,
  email VARCHAR (355) UNIQUE,
  password VARCHAR (100) NOT NULL,
  created_on TIMESTAMP NOT NULL,
  last_login TIMESTAMP
);

-- milestone 1
-- article
DROP TABLE IF EXISTS article;
CREATE TABLE article(
  id serial PRIMARY KEY,
  title VARCHAR (500) NOT NULL,
  writer VARCHAR (400) NOT NULL,
  thumbnail VARCHAR (200),
  description VARCHAR (400),
  category VARCHAR,
  domain VARCHAR(100) NOT NULL,
  published BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL
);
-- block
DROP TABLE IF EXISTS article_block;
CREATE TABLE article_block(
  id serial PRIMARY KEY,
  article_id serial NOT NULL,
  type VARCHAR (100) NOT NULL,
  -- content VARCHAR (2000),
  content_data json,
  optional VARCHAR (1000),
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL
  -- tag array?
);

-- article tag(category)
DROP TABLE IF EXISTS article_tag;
CREATE TABLE article_tag(
  id serial PRIMARY KEY,
  article_id serial NOT NULL,
  tag_id serial NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL
);

-- tag
DROP TABLE IF EXISTS tag;
CREATE TABLE tag(
  id serial PRIMARY KEY,
  tagname VARCHAR(100) NOT NULL,
  domain VARCHAR(100) NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL
);

-- milestone 2
-- group -- group - category
-- role
-- block tag
