var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');

var session = require('express-session');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

const dotenv = require('dotenv');
dotenv.config();


const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;



passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:8000/auth/github/callback'
},
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));


var jsonData = require('./public/storys/routine.json');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var timestatusRouter = require('./routes/timestatus');
var newcharaRouter = require('./routes/newchara');
const router = require('./routes/index');


var app = express();
app.use(helmet());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: '00d2fec3083d31e0', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/timestatus', timestatusRouter);
app.use('/newchara', newcharaRouter);


//GitHub
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  function (req, res) {
});

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
   
});

app.get('/login', function (req, res) {
  res.render('login');

});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

//dbの準備のために一旦入力した値を配列に格納

//データベースに保存する
const CharaData = require('./lib/post');
const StoryData = require('./lib/post');
const EpisodeData = require('./lib/post');
const EndingData = require('./lib/post');


//入力した値を表示する
var bodyParser = require('body-parser');
const { unwatchFile } = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));



app.route('/newchara')
  .post(function (req, res) {
    let charaname = req.body.charaname;

    res.redirect('/decidepol');
  })
  
  








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
