const passport = require('passport')
const router = require('express').Router()

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://www.ravelry.com/oauth2/auth',
  tokenURL: 'https://www.ravelry.com/oauth2/token',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "https://localhost:8080/auth/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ exampleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

router.get('/',
  passport.authenticate('oauth2'));

router.get('/callback',
  passport.authenticate('oauth2', {
    failureRedirect: '/login',
    successRedirect: '/home'
  })
);
