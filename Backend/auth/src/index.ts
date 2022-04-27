import express from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github';
import User from './userSchema';
import { MongoUser } from './types';

dotenv.config();


const app = express();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions, () => {
    console.log("Successfully connected to MongoDB database");
});

app.set("trust proxy", 1);

//Express middleware
app.use(express.json());
// dev url: http://localhost:3000
app.use(cors({ origin: ["https://www.reactwhiteboard.com", "http://localhost:3000"], credentials: true }));
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
        cookie: {
            sameSite: 'none',
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 // one week
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: MongoUser, done: any) => {
    return done(null, user._id);
});

passport.deserializeUser((id: string, done: any) => {
    User.findById(id, (err: Error, doc: MongoUser) => {
        return done(null, doc);
    });
});

// Handling tokens via passport

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // dev url: localhost:4000/auth/google/callback
    callbackURL: "/auth/google/callback"
},
(_: any, __: any, profile: any, cb: any) => {
    console.log(profile);

    User.findOne({ googleId: profile.id }, async (err: Error, doc: MongoUser) => {
        
        if(err){
            return cb(err, null);
        }
        
        if(!doc){
            // create a mongo doc if one isnt present
            const newUser = new User({
                googleId: profile.id,
                username: profile.name.givenName
            });
            await newUser.save();
            cb(null, newUser);
        }
        cb(null, doc);
    });

}));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // dev url: localhost:4000/auth/github/callback
    callbackURL: "/auth/github/callback"
}, (_: any, __: any, profile: any, cb: any) => {
    console.log(profile);

    User.findOne({ githubId: profile.id }, async (err: Error, doc: MongoUser) => {
        
        if(err){
            return cb(err, null);
        }
        
        if(!doc){
            // create a mongo doc if one isnt present
            const newUser = new User({
                githubId: profile.id,
                username: profile.username
            });
            await newUser.save();
            cb(null, newUser);
        }
        cb(null, doc);
    });

}));

// routes

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // dev url: http://localhost:3000/whiteboards
    res.redirect('https://www.reactwhiteboard.com/whiteboards');
});

app.get('/auth/github', passport.authenticate('github', { scope: ['profile'] }));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    // dev url: http://localhost:3000/whiteboards
    res.redirect('https://www.reactwhiteboard.com/whiteboards');
});

app.get('/auth/logout', (req, res) => {
    if(req.user){
        req.logout();
        res.sendStatus(200);
    }
});

app.get("/", (req, res) => {
    res.send("Hey There. If you're reading this, you're in the wrong place. Click <a href='https://www.reactwhiteboard.com/'>here</a> to head back.");
});

app.get("/user", (req, res) => {
    res.send(req.user);
});

app.listen(process.env.PORT || 4000, () => {
    console.log("Typescript Auth Server Running...");
})