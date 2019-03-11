// TODO: include a few pages that incorporate API data

const express = require("express");
const randomstring = require("randomstring");
const request = require("request");
const session = require("express-session");
const app = express();
const https = require("https");
const fs = require("fs");

// Session for storing the token for future use
// TODO: refresh if it is close to expiring

app.use(
  session({
    // secret: process.env.SESSION_SECRET,
    secret: 'iaheoiaejdhgejjedhofisdihagrafeh',
    resave: false,
    saveUninitialized: true
  })
);

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use('/api', require('./api'))
app.use('/auth', require('./auth'))

const oauth2 = require("simple-oauth2").create({
  // The oauth endpoints are all at WWW.ravelry.com
  auth: {
    tokenHost: "https://www.ravelry.com",
    tokenPath: "/oauth2/token",
    authorizePath: "/oauth2/auth"
  },
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  }
});

app.get("/", (req, res) => {
  res.send('🐑 <a href="/auth">Log in with Ravelry</a>');
});

// You'll need to register the redirect URI (or URIs) that you want to use
// in your Ravelry Pro account. We will only allow users to be redirected to
// URLs that you have registered.

app.get("/auth", (req, res) => {
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: process.env.MY_REDIRECT_URL,
    state: randomstring.generate(),
    scope: "offline" // offline scope is needed if you want to receive a refresh token (you do)
  });

  res.redirect(authorizationUri);
});

// Our redirect URI is https://ravelry-test-oauth.glitch.me/callback
// When we receive a redirect from Ravelry, exchange the authorization code for an OAuth token

app.get("/callback", (req, res) => {
  const options = {
    code: req.query.code,
    redirect_uri: process.env.MY_REDIRECT_URL
  };

  oauth2.authorizationCode.getToken(options, async (error, result) => {
    if (error) {
      return res.send("😞 authentication failed: " + error.message);
    }

    // Now we have a token. It will expire so it helps to use our OAuth
    // library's support for refreshing it before it expires.
    // With simple-oauth2, we can do token = oauth2.accessToken.create(result);
    // and then shortly before it expires we can call token.refresh()


    const token = oauth2.accessToken.create(result);
    req.session.accessToken = result.access_token;


    // Use your favorite library for requesting JSON API data.
    // Add a HTTP header that looks like
    // "Authorization: Bearer <your token text>"
    // ..and you are good to go.

    // Let's spit out the /current_user.json data just to show that we can
    request(
      {
        url: "https://api.ravelry.com/current_user.json",
        headers: {
          Authorization: "Bearer " + req.session.accessToken
        }
      },
      function(error, response, body) {
        return res.send("I retrieved /current_user.json: <br/><br/>" + body);
      }
    );
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 8080, function() {
  console.log("Listening on port " + listener.address().port);
});

const options = {
  hostname: "localhost",
  key: fs.readFileSync("ssl/localhost.key"),
  cert: fs.readFileSync("ssl/localhost.crt")
 };
 https
  .createServer(options, (req, res) => {
   res.writeHead(200);
   res.end("hello world\n");
  })
  .listen(8888);
