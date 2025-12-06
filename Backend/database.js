require("dotenv").config();
const fs = require('fs').promises;
const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

const execute = async(query) => {
    try {
        await pool.connect(); // create a connection
        await pool.query(query); // executes a query
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createPostTblQuery = `
    CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        body TEXT NOT NULL,
        author_name VARCHAR(200) NOT NULL,
        create_time TIMESTAMP NOT NULL,
        profile_picture TEXT,
        likes INTEGER DEFAULT 0,
        img TEXT
    );`;

execute(createPostTblQuery).then(result => {
    if (result) {
        console.log('Table "posts" is created');
    }
});

const createUserTblQuery = `
    CREATE TABLE IF NOT EXISTS "user" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

execute(createUserTblQuery).then(result => {
    if (result) {
        console.log('Table "user" is created');
    }
});

//upload default post to database
async function insertPosts()
{
    const jsonData = await fs.readFile("posts.json", 'utf8');
    const posts = JSON.parse(jsonData);

    posts.forEach(item => {
        pool.query( // insert post
            "INSERT INTO posts(body, author_name, create_time, profile_picture, likes, img) values ($1, $2, $3, $4, $5, $6) RETURNING*", 
            [item.body, item.author_name, item.create_time, item.profile_picture, 0, item.img]
        );
    });
}

insertPosts();

module.exports = pool;