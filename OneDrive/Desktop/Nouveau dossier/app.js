const express = require("express");
const app = express();
const port = 3001;
const authRoutes = require('./routes/auth-routes');
const admin = require("firebase-admin");
const credentials = require("./sqilco-firebase-adminsdk-ocoft-84b88adf69.json");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});
app.use(express.urlencoded({ extended: true }));

// app.use(passport.initialize());
// app.use(passport.session());

passport.use('signup', new LocalStrategy(
    {
        passReqToCallback: true,
    },
    async function(email,username, password,req, done) {
      try {
        const userRecord = await firebaseAdmin.auth().createUser({
          username: username,
          password: password,
          email:email,// Assume name is provided in the request body
          phoneNumber: req.body.phone
        });
        console.log('User created:', userRecord);
        return done(null, userRecord);
      } catch (error) {
        console.error('Error creating user:', error);
        return done(error);
      }
    }
  ));
  
// Route to handle form submission
app.post('/signup',
    passport.authenticate('local-signup', { successRedirect: '/', failureRedirect: '/signup' })
);

// set up routes
app.use('/auth',authRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`app now listening for requests on port ${port}`);
});
