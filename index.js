//This file contains code that is associated with booting up our app
//To deploy app to Heroku via git, add . then commit to my git, then: git push heroku master.
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User')
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express()

//app.use calls are wiring up middleware.
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
        //cokkieSession can take multiple keys. Therefore needs to be passed in an array
    })
);


app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT);