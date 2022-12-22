CREATE DATABASE pern-todo-list;

--\c pern-todo-list

CREATE TABLE todo(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);