var express = require('express');
var passport = require('passport');
var util = require('util');
var InstagramStrategy = require('passport-instagram').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session        = require('express-session');
var cors = require('cors')


/******************************************
CLIENT ID cc4b050c584f4c01a1588c3124c01ba4
CLIENT SECRET dbb54cf4de2f40fa9d8534ab3e273366
WEBSITE URL http://localhost:3000
REDIRECT URI  http://localhost:3000/auth/instagram/callback
**********************************************/

var INSTAGRAM_CLIENT_ID = "cc4b050c584f4c01a1588c3124c01ba4";
var INSTAGRAM_CLIENT_SECRET = "dbb54cf4de2f40fa9d8534ab3e273366";

var app = express();

app.use(cors({credentials: true, origin: true}));

var corsOptions = {"preflightContinue": true};

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(cors());

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/../public'));
app.use(cookieParser());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
app.use(allowCrossDomain);
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: '84ng028ghw0ths0bh49s0bh92',
  cookie: {maxAge:10000},
  resave: false,
  saveUninitialized: false
}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

passport.use(new InstagramStrategy({
    clientID: INSTAGRAM_CLIENT_ID,
    clientSecret: INSTAGRAM_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/instagram/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ instagramId: profile.id }, function (err, user) {
      console.log('user', user);
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the InstagramStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Instagram
//   profile), and invoke a callback with a user object.
passport.use(new InstagramStrategy({
    clientID: INSTAGRAM_CLIENT_ID,
    clientSecret: INSTAGRAM_CLIENT_SECRET,
    callbackURL: "http://insta-viewer.herokuapp.com"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Instagram profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Instagram account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

// GET /auth/instagram
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Instagram authentication will involve
//   redirecting the user to instagram.com.  After authorization, Instagram
//   will redirect the user back to this application at /auth/instagram/callback
app.get('/auth/instagram',
  passport.authenticate('instagram'),
  function(req, res){
    // The request will be redirected to Instagram for authentication, so this
    // function will not be called.
  });

// GET /auth/instagram/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/instagram/callback', 
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('I have got here');
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(app.get('port'), function() {
  console.log('It is working!');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
