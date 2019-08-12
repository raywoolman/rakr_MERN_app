//contains express routing. Exported as arrow function so when it is required, it is called

const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    )
    
    app.get(
        '/auth/google/callback',
        passport.authenticate('google')
    );
}