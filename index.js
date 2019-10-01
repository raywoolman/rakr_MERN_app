//This file contains code that is associated with booting up our app
//To deploy app to Heroku via git, add . then commit to my git, then: git push heroku master.
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User')
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express()

//app.use calls are wiring up middleware.

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
        //cookieSession can take multiple keys. Therefore needs to be passed in an array
    })
);


app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// console.log("above if",process.env.NODE_ENVV ==='production',process.env.NODE_ENVV, typeof process.env.NODE_ENVV)
if (process.env.NODE_ENV ==='production') {
    // console.log("in it")
    // Express will serve prod. assets (main.js / main.ss)
    app.use(express.static('client/build'));
    //Express will serve index.html if unrecognised route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirName, 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 5000
app.listen(PORT);