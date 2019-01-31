const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id); // this id reffer to the DB Id(key), not the google profile one
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
});

passport.use(new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((existingUser) => {
            if(existingUser) {
                done(null, existingUser);
            } else {
                new User({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user));
            }
        })
    }
  ));
  // authorize http://localhost:5000/auth/google/callback on googleAPI's