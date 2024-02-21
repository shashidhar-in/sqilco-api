const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    req.logout(); // Fix: Remove the string argument from req.logout()
    res.send('Logging out'); // Send a response to indicate logging out
});

router.get('/signup', (req, res) => {
    res.render('signup'); 
});
router.get('/google',passport.authenticate('google',{
    scope: ['profile']
}));
// router.get('/login/federated/google', passport.authenticate('google'));

module.exports = router;
