const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    );
    // 'google' is an internal identifier for the instance GoogleStrategy declared previously
    
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google')
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user)
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};