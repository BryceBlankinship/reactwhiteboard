import express from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

dotenv.config();


const app = express();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions, () => {
    console.log("Successfully connected to MongoDB database");
});

//Express middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.reactwhiteboard.com/auth/google/callback"
},
(accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return cb(err, user);
    })
}))

app.get("/", (req, res) => {
    res.send("Hello Typescript World!");
});

app.listen(4000, () => {
    console.log("Typescript Auth Server Running...");
})