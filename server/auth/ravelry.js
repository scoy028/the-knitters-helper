const passport = require('passport')
const OAuthStrategy = require('passport-oauth').OAuthStrategy;
const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  console.log('Ravelry client ID / secret not found. Skipping Ravelry OAuth.')
} else {
  const ravelryConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.MY_REDIRECT_URL
  }

  const strategy = new OAuthStrategy(
    ravelryConfig,
    (token, refreshToken, profile, done) => {
      const ravelryId = profile.id
      const name = profile.displayName
      const email = profile.emails[0].value

      User.findOrCreate({
        where: {ravelryId},
        defaults: {name, email}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )
  passport.use(strategy)
}

router.get("/",
  passport.authenticate("ravelry", {
    state: uuid(), // Because Im told by the API this is necessary...
    scope: "offline",
    session: false,
  })
)

router.get("/callback",
  passport.authenticate("ravelry", {
    successRedirect: "/home",
    failureRedirect: "/login",
    session: false,
  }),
  auth.redirect
)
