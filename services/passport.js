//To add more authentication strategies, install and add the Passport strategy and setup the express routes.

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

// Cannot require in Mongoose library directly as Mongoose sees that as trying
// to create multiple schemas. In stead, declare variable to schema name
// specifically. When using mongoose.model, one argument means fetching data, 2
// args (one Schema name and other Schema), means pushing data
const User = mongoose.model('users')


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User
    .findById(id)
    .then(user => {
      done(null, user);
    });
});

// new User = new instance in db based on Schema defines in Users.js Populating
// GoogleId with data from Google profile .save() method pushes to MongoDB.
// Otherwise it is only local
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, (accessToken, refreshToken, profile, done) => {
  User
    .findOne({googleId: profile.id})
    .then(existingUser => {
      if (existingUser) {
        // we already have a profile with that ID. Skip making new profile done
        // (passport method) takes 2 args. 1: to send if there has been an error (no
        // error: null). 2: user record: In this case, existing user.
        done(null, existingUser);
      } else {
        // No record exists with this ID, so create one and save. As this is
        // asynchronous, use .then promise to call done with no error and the user. User
        // is allocated in return of then promise, because Mongo may return a slightly
        // different instance in the promise
        new User({googleId: profile.id})
          .save()
          .then(user => done(null, user))
      }
    })
}))