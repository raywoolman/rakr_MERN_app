const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

// Cannot require in Mongoose library directly as Mongoose sees that as trying to
// create multiple schemas. In stead, declare variable to schema name
// specifically. When using mongoose.model, one argument means fetching data, 2
// args (one Schema name and other Schema), means pushing data
const User = mongoose.model('users')


//new User = new instance in db based on Schema defines in Users.js
//Populating GoogleId with data from Google profile
//.save() method pushes to MongoDB. Otherwise it is only local
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  new User({googleId: profile.id}).save();
}))