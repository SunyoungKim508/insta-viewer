var express = require('express');
var passport = require('passport');
var util = require('util');
var TwitterStrategy = require('passport-twitter').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors')
var request = require('request');


/******************************************
CLIENT ID cc4b050c584f4c01a1588c3124c01ba4
CLIENT SECRET dbb54cf4de2f40fa9d8534ab3e273366
WEBSITE URL http://localhost:3000
REDIRECT URI  http://localhost:3000/auth/twitter/callback
**********************************************/

var app = express();
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

app.use(cors({credentials: true, origin: true}));

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


var TWITTER_CONSUMER_KEY = "0MBi9ezl2XwCEjlOvjJHxmZwL";
var TWITTER_CONSUMER_SECRET = "dCY7HuA1ZQIJ8kgFouezTgRe7FvluU17wihcf9Xu5IQXI2Yt4b";

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://insta-viewer.herokuapp.com/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
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

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(app.get('port'), function() {
  console.log('It is working!');
});

app.get('/search/:username', function(req, res) {
  var user = req.params.username;
  var token = '506650360.cc4b050.0584728c2fcc4bd2a99b09884786db4a';
  // var url = 'https://api.instagram.com/v1/users/'+user+'/?access_token=506650360.cc4b050.0584728c2fcc4bd2a99b09884786db4a&scope=public_content';
  var url = 'https://api.instagram.com/v1/users/search?q='+user+'&access_token=' + token;
  console.log(url);
  var options = {
    url: url,
    json: true,
    headers: {
      'User-Agent': 'request',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  function callback(error, response, body) {
    if (!error) {
      console.log('hi', JSON.stringify(body.data)); // Print the google web page.
      res.json(body.data);
    } else {
      console.log('yo', error);
    }
  }

  request(options, callback);
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
