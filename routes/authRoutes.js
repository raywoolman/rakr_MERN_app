// contains express routing. Exported as arrow function so when it is required, it is called

const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }))

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  })

  // When app.get function changed to: res.send(req.session), get request promts passport
  // to extract cookie object

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
}