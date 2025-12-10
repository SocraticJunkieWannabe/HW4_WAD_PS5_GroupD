const express = require('express');
const pool = require('./database');
const cors = require('cors')
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

// The express.json() function is a built-in middleware function in Express. 
// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

//ALL JWT AUTHENTICATION RELATED CODE
// Authentication dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Utility to generate a token
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// Middleware to protect routes
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Missing authentication token' });
  }

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = payload; // { id, email }
    next();
  });
}

// REGISTER
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user already exists
    const existing = await pool.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.query(
      'INSERT INTO "user" (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );

    const user = result.rows[0];
    const token = generateToken(user);

    res.status(201).json({
      user,
      token,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// LOGIN
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const result = await pool.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.json({
      user: { id: user.id, email: user.email },
      token,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// WHO AM I (optional, to test auth)
app.get('/auth/me', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email FROM "user" WHERE id = $1',
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Auth me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//ALL POSTS ACTIONS

app.get('/posts/getAll', async(req, res) => {
    try {
        console.log("a posts request has arrived");
        const posts = await pool.query('SELECT * FROM "posts"');
        res.status(200).json(posts.rows);
    } catch (error) {
        res.status(401).json({ error: error.message });
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

//SINGLE POST REQUESTS
app.put('/post/update/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;

    try {
        console.log("an update request has arrived");

        const result = await pool.query(
            `UPDATE "posts"
             SET body = $1
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

app.delete('/post/delete/:id', async(req, res) => {
    const { id } = req.params;

    try {
        console.log("a delete post request has arrived");
        const result = await pool.query('DELETE FROM "posts" WHERE id = $1;', [id]);
        

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({ message: `post ${id} deleted`, deleted: result.rows[0]});

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

app.get('/post/get/:id', async(req, res) => {

    const { id } = req.params;

    try {
        console.log(`post request for post id ${id} has arrived`);
        const post = await pool.query('SELECT * FROM "posts" WHERE id = $1', [id]);

        if (post.rowCount === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        res.status(200).json(post.rows[0]);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});
