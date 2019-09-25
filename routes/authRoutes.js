// contains express routing. Exported as arrow function so when it is required,
// it is called

const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }))

  app.get('/auth/google/callback', passport.authenticate('google'), 
  (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  })

  // When app.get function changed to: res.send(req.session), get request promts
  // passport to extract cookie object

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
}