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

//upload default post to database
async function insertDefaultPosts()
{
    const jsonData = await fs.readFile("posts.json", 'utf8');
    const posts = JSON.parse(jsonData);

    const res = await pool.query('SELECT COUNT(*) FROM posts');
    const count = parseInt(res.rows[0].count, 10);
    //only add the default columns if the database is empty
    if (count === 0) {
        for (const item of posts) {
            await pool.query(// insert post
                'INSERT INTO posts(body, author_name, create_time, profile_picture, likes, img) values ($1, $2, $3, $4, $5, $6) RETURNING*', 
                [item.body, item.author_name, item.create_time, item.profile_picture, 0, item.img]
            );
        };
    } 
}

const createPostTblQuery = `
    CREATE TABLE IF NOT EXISTS "posts" (
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
        insertDefaultPosts();
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



module.exports = pool;