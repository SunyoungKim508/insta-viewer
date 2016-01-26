var express = require('express');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var request = require('request');
var User = require('../db/models/user');
var mongoose = require('mongoose');
var keys = require('./keys');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/../public'));
app.use(cookieParser());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));



/***************************************************
 Session and authentication
 ***************************************************/
 
var oauth = { 
  consumer_key: keys.consumerKey, 
  consumer_secret: keys.consumerSecret, 
  token: keys.token, 
  token_secret: keys.tokenSecret
};

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

// callback URL: http://insta-viewer.herokuapp.com/auth/twitter/callback

passport.use(new TwitterStrategy({
    consumerKey: oauth.consumer_key,
    consumerSecret: oauth.consumer_secret,
    callbackURL: "http://insta-viewer.herokuapp.com/auth/twitter/callback",
    passReqToCallback: true
  },
  function(req, userToken, userTokenSecret, profile, done) {
    var userObj = {
      twitterId: profile.id,
      username: profile.username,
      fullname: profile.displayName,
      photo: profile.photos[0].value
    };

    // update the token and token secret with current user's
    oauth.token_secret = userTokenSecret;
    oauth.token = userToken;

    User.findOne({twitterId: profile.id}, function (err, user) {
      if (user) {
        return done(err, user);
      } else {
        User.create(userObj, function(err, user) {
          return done(err, user);
        })
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}




/***************************************************
  Endpoint
 ***************************************************/

app.get('/logout', function(req, res){
  // reset the session
  req.logout();
  oauth.token_secret = require('./keys').tokenSecret;
  oauth.token = require('./keys').token;
  res.redirect('/');
});

app.get('/user/:username', function(req, res) {
  var username = req.params.username;
  var url = 'https://api.twitter.com/1.1/users/lookup.json';
  var q = { screen_name: username };
  request.get({url:url, oauth:oauth, qs:q, json:true}, function (e, r, user) {
    res.json(user);
  })
});

app.get('/tweets/:username', function(req, res) {
  var username = req.params.username;
  var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
  var q = { screen_name: username, count: 10 };
  request.get({url:url, oauth:oauth, qs:q, json:true}, function (e, r, tweets) {
    res.json(tweets);
  })
});



/***************************************************
 Database
 ***************************************************/

var mongoURI = 'mongodb://admin:admin12@ds049925.mongolab.com:49925/twitter-viewer';
mongoose.connect(mongoURI);

// Run in seperate terminal window using 'mongod'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
});



/***************************************************
 Port: 3000 or process.env.PORT
 ***************************************************/

app.listen(app.get('port'), function() {
  console.log('It is working! Check localhost:3000');
});
