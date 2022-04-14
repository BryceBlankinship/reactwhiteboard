import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const posts = [
    {
        email: 'Bryce',
        title: 'Post 1'
    },
    {
        email: 'Kyle',
        title: 'Post 2'
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.email === req.body.email));
});

//Authenticate user by creating a JWT
app.post('/auth/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    res.json({ accessToken: jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET) });
});


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) return res.status(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email) => {
        if(err) return res.status(403)
        req.email = email;
        next();
    })
}


app.listen(8000);