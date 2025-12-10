const express = require('express');
const pool = require('./database');
const cors = require('cors')
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

// The express.json() function is a built-in middleware function in Express. 
// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

app.get('/posts/getAll', async(req, res) => {
    try {
        console.log("a posts request has arrived");
        const posts = await pool.query('SELECT * FROM "posts"');
        res.status(200).json(posts.rows);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

app.put('post/update/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;

    try {
        console.log("an update request has arrived");

        const result = await pool.query(
            `UPDATE "posts"
             SET body = $1,
             WHERE id = $2
             RETURNING *`,
            [body, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

app.delete('/posts/deleteALl', async(req, res) => {
    try {
        console.log("a delete all posts request has arrived");
        const posts = await pool.query('TRUNCATE TABLE "posts";');
        res.status(200).json({ message: "All posts deleted" });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});
