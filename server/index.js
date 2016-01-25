var express = require('express');
var passport = require('passport');
var util = require('util');
var TwitterStrategy = require('passport-twitter').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors')
var request = require('request');
var User = require('../db/models/user');
var mongoose = require('mongoose');
var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var qs = require('querystring');

var mongoURI = 'mongodb://admin:admin12@ds049925.mongolab.com:49925/twitter-viewer';
mongoose.connect(mongoURI);

// Run in seperate terminal window using 'mongod'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
});


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
// callback URL: http://insta-viewer.herokuapp.com/auth/twitter/callback


passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    var userObj = {
      twitterId: profile.id,
      username: profile.username,
      fullname: profile.displayName,
      photo: profile.photos[0].value
    };
    // console.log(User);
    // User.findOrCreate(userObj, function (err, user) {
    //   return done(err, user);
    // });
    console.log('before going to db');
    User.findOne({twitterId: profile.id}, function (err, user) {
      console.log('inside findone');
      if (user) {
        console.log('inside user');
        return done(err, user);
      } else {
        console.log('inside error', err);
        User.create(userObj, function(err, user) {
          console.log(userObj);
          console.log(user);
          return done(err, user);
        })
      }
    });
    /*
      {
        twitterId: profile.id,
        username: profile.username,
        fullname: profile.displayName,
        photo: profile.photos[0].value
      }
     */

    // console.log(profile);
    // return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/', function(req, res){

  // res.render('index', { user: req.user });
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
    console.log('get /');
    /*
     { __v: 0,
      photo: 'https://pbs.twimg.com/profile_images/691109361507135489/cdP5dU-w_normal.jpg',
      fullname: 'Sunyoung Kim',
      username: 'stella_kim58',
      twitterId: '4805863400',
      _id: 56a4774fa72629347724ba0c }
      */
    console.log(req.session.passport.user);
    console.log('YO WORK');
    res.redirect('/', {user: req.session.passport.user});
  });


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(app.get('port'), function() {
  console.log('It is working!');
});


// Search
// 'https://api.twitter.com/1.1/users/lookup.json?screen_name=sunyoung'
// app.get('/search/:username', function(req, res) {
//   var httpMethod = 'GET';
//   var username = req.params.username;
//   var url = 'https://api.twitter.com/1.1/users/lookup.json?';
//   var parameters = {
//     screen_name: username,
//     oauth_consumer_key : '0MBi9ezl2XwCEjlOvjJHxmZwL',
//     oauth_token : '4805863400-TzhaEcnNkAT57Vh6pBcZQwd9d98Usg1mYhSHCaT',
//     oauth_nonce : n(),
//     oauth_timestamp : +new Date,
//     oauth_signature_method : 'HMAC-SHA1',
//     oauth_version : '1.0'
//   };
//   var consumerSecret = 'dCY7HuA1ZQIJ8kgFouezTgRe7FvluU17wihcf9Xu5IQXI2Yt4b';
//   var tokenSecret = '9w0Nze64uzct5siHlm3cUQxF99v5HhW57EOAbo82O6r1N';
//   // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
//   var encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret);
//   // generates a BASE64 encode HMAC-SHA1 hash
//   var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret,{ encodeSignature: false});
//   console.log(encodedSignature);
//   console.log(signature);
// });

// OAuth1.0 - 3-legged server side flow (Twitter example)
// step 1
app.get('/search/:username', function(req, res) {
  var username = req.params.username;  
  var consumerKey = '0MBi9ezl2XwCEjlOvjJHxmZwL';
  var consumerSecret = 'dCY7HuA1ZQIJ8kgFouezTgRe7FvluU17wihcf9Xu5IQXI2Yt4b';
  var tokenSecret = '9w0Nze64uzct5siHlm3cUQxF99v5HhW57EOAbo82O6r1N';
  var token = '4805863400-TzhaEcnNkAT57Vh6pBcZQwd9d98Usg1mYhSHCaT';
  var oauth = { 
    consumer_key: consumerKey, 
    consumer_secret: consumerSecret, 
    token:  token, 
    token_secret: tokenSecret
  };
  var url = 'https://api.twitter.com/1.1/users/lookup.json';
  var q = { screen_name: username };
  request.get({url:url, oauth:oauth, qs:q, json:true}, function (e, r, user) {
    console.log('server', user);
    console.log('err', user.errors);
    res.json(user);
  })
});
// app.get('/search/:username', function(req, res) {
//   var user = req.params.username;
//   var token = '506650360.cc4b050.0584728c2fcc4bd2a99b09884786db4a';
//   // var url = 'https://api.instagram.com/v1/users/'+user+'/?access_token=506650360.cc4b050.0584728c2fcc4bd2a99b09884786db4a&scope=public_content';
//   var url = 'https://api.instagram.com/v1/users/search?q='+user+'&access_token=' + token;
//   console.log(url);
//   var options = {
//     url: url,
//     json: true,
//     headers: {
//       'User-Agent': 'request',
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     }
//   };

//   function callback(error, response, body) {
//     if (!error) {
//       console.log('hi', JSON.stringify(body.data)); // Print the google web page.
//       res.json(body.data);
//     } else {
//       console.log('yo', error);
//     }
//   }

//   request(options, callback);
// });

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
