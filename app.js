//
// Project Dependencies
//
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const ejs = require('ejs');
const mysql = require('mysql');
const randtoken = require('rand-token');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

//
// Constants
//
const app = express();
const config = require('./config.json');
const package = require('./package.json');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var obj = {};
var gentoken = randtoken.generate(16);

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));
app.use(cookieParser());

//
// Session
//
app.use(sessions({
  secret: config.sessiontoken,
  resave: false,
  saveUninitialized: true
}));

//
// Database Connection
//
const connection = mysql.createConnection({
  host: config.databasehost,
  user: config.databaseuser,
  password: config.databasepassword,
  database: config.databasedatabase
});

connection.connect(function (err) {
  if (err) {
    console.error(chalk.red('[ERROR] ') + chalk.blue('[DB] ') +  'There was an error connecting:\n' + err.stack);
    return;
  } else {
    console.log(chalk.yellow('[CONSOLE] ' ) + chalk.blue('[DB] ') + 'Database connection is successful. Your connection ID is ' + connection.threadId + '.\n');
  };
});

//
// Landing Page
//
app.get('/', function (req, res) {
  res.render('landing');
});

app.post('/', urlencodedParser, function (req, res) {
  var tokencookie = req.cookies.token;

  console.log(gentoken);
  res.cookie('token', gentoken);

  // Insert token into the database
  let sql = `INSERT INTO ${config.databasetable} (tokenid) VALUES ('${gentoken}');`;
  connection.query (sql, function (err, result) {
    if (err) {
      throw err;
      } else {
        res.redirect('/getting-started');
        console.log('Success');
      }
    });
});

//
// Dashboard Login
//
app.get('/login', function (req, res) {
  session = req.session;
  if (session.uniqueID) {
    res.redirect('/dashboard');
  } else {
    res.render('login');
  };
});

app.post('/login', urlencodedParser, function (req, res) {
  session = req.session;
  if (req.body.username == config.adminusername && req.body.password == config.adminpassword) {
    session.uniqueID = req.body.username;
    res.redirect('/dashboard');
    console.log(chalk.yellow('[CONSOLE] ') + chalk.magenta('[ADMIN] ') + 'A user has successfully logged in as Administrator.');
  } else {
    res.redirect('/');
    console.log(chalk.yellow('[CONSOLE] ') + chalk.magenta('[ADMIN] ') + chalk.red('[ERROR] ') + 'A user has attemped to log into the Administration panel, but failed.');
  };
});

//
// Dashboard
//
app.get('/dashboard', function (req, res) {
  res.render('dashboard');
});

//
// Getting Started
//
app.get('/getting-started', function (req, res) {
  res.render('getting-started');
});

app.post('/getting-started', urlencodedParser, function (req, res) {
  var tokencookie = req.cookies.token;
  let sql = `UPDATE ${config.databasetable}
    SET name=?,
        favcolour=?,
        school=?,
        schoolgrade=?,
        discussiongroup=?,
        emailaddress=?,
        reunionpermission=?,
        crupromotionpermission=?
    WHERE tokenid='${tokencookie}';`;
  let inserts = [
    `${req.body.name}`,
    `${req.body.favcolour}`,
    `${req.body.school}`,
    `${req.body.schoolgrade}`,
    `${req.body.discussiongroup}`,
    `${req.body.emailaddress}`,
    `${req.body.reunionpermission}`,
    `${req.body.crupromotionpermission}`
  ];
  sql = mysql.format(sql, inserts);

  connection.query (sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(req.body);
      res.redirect('/camp-aspect');
    }
  });
});

//
// Camp Aspect
//
app.get('/camp-aspect', function (req, res) {
  res.render('camp-aspect');
});

app.post('/camp-aspect', urlencodedParser, function (req, res) {
  var tokencookie = req.cookies.token;
  let sql = `UPDATE ${config.databasetable}
    SET campoverallrating=?,
        campfavouritething=?,
        campbebetter=?,
        leadersrating=?,
        leadersratingcomments=?,
        electivename=?,
        electivesrating=?,
        electiveratingcomments=?,
        oneshotname=?,
        oneshotrating=?,
        oneshotcomments=?,
        themenightrating=?,
        themenightcomments=?,
        shownightrating=?,
        shownightcomments=?,
        gamestratrating=?,
        gamestratcomments=?,
        outdoorgamesrating=?,
        outdoorgamescomments=?,
        discussiongrouprating=?,
        discussiongroupcomments=?,
        downloadoverallrating=?,
        downloadoverallcomments=?,
        downloadspeakerrating=?,
        downloadspeakercomments=?,
        downloadsingingrating=?,
        downloadsingingcomments=?,
        cabinsrating=?,
        cabinscomments=?,
        foodrating=?,
        foodcomments=?,
        freetimerating=?,
        freetimecomments=?
      WHERE tokenid='${tokencookie}';`;
  let inserts = [
    `${req.body.campoverallrating}`,
    `${req.body.campfavouritething}`,
    `${req.body.campbebetter}`,
    `${req.body.leadersrating}`,
    `${req.body.leadersratingcomments}`,
    `${req.body.electivename}`,
    `${req.body.electivesrating}`,
    `${req.body.electiveratingcomments}`,
    `${req.body.oneshotname}`,
    `${req.body.oneshotrating}`,
    `${req.body.oneshotcomments}`,
    `${req.body.themenightrating}`,
    `${req.body.themenightcomments}`,
    `${req.body.shownightrating}`,
    `${req.body.shownightcomments}`,
    `${req.body.gamestratrating}`,
    `${req.body.gamestratcomments}`,
    `${req.body.outdoorgamesrating}`,
    `${req.body.outdoorgamescomments}`,
    `${req.body.discussiongrouprating}`,
    `${req.body.discussiongroupcomments}`,
    `${req.body.downloadoverallrating}`,
    `${req.body.downloadoverallcomments}`,
    `${req.body.downloadspeakerrating}`,
    `${req.body.downloadspeakercomments}`,
    `${req.body.downloadsingingrating}`,
    `${req.body.downloadsingingcomments}`,
    `${req.body.cabinsrating}`,
    `${req.body.cabinscomments}`,
    `${req.body.foodrating}`,
    `${req.body.foodcomments}`,
    `${req.body.freetimerating}`,
    `${req.body.freetimecomments}`
  ];
  sql = mysql.format(sql, inserts);

  connection.query (sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      console.log(req.body);
      res.redirect('/camp-experience');
    };
  });
});

//
// Camp Experience
//
app.get('/camp-experience', function (req, res) {
  res.render('camp-experience');
});

app.post('/camp-experience', urlencodedParser, function (req, res) {
  var tokencookie = req.cookies.token;
  let sql = `UPDATE ${config.databasetable}
    SET firstcrutech=?,
        anothercrutech=?,
        sumcrutechinasentence=?,
        newcampideas=?,
        firstcrucamp=?,
        anothercrucamp=?,
        recommendcrucamp=?,
        newfriendsoncamp=?,
        feelwelcomeandcared=?,
        feelwelcomeandcaredcomments=?,
        whycomeoncamp=?,
        whycomeoncampother=?,
        whynotcomeonmorecamps=?,
        whynotcomeonmorecampsother=?
    WHERE tokenid='${tokencookie}';`;
  let inserts = [
    `${req.body.firstcrutech}`,
    `${req.body.anothercrutech}`,
    `${req.body.sumcrutechinasentence}`,
    `${req.body.newcampideas}`,
    `${req.body.firstcrucamp}`,
    `${req.body.anothercrucamp}`,
    `${req.body.recommendcrucamp}`,
    `${req.body.newfriendsoncamp}`,
    `${req.body.feelwelcomeandcared}`,
    `${req.body.feelwelcomeandcaredcomments}`,
    `${req.body.whycomeoncamp}`,
    `${req.body.whycomeoncampother}`,
    `${req.body.whynotcomeonmorecamps}`,
    `${req.body.whynotcomeonmorecampsother}`
  ];
  sql = mysql.format(sql, inserts);

    connection.query (sql, function (err, result) {
      if (err) {
        throw err;
      } else {
        console.log(req.body);
        res.redirect('/faith-and-commitment');
      };
  });
});

//
// Faith and Commitment
//
app.get('/faith-and-commitment', function (req, res) {
  res.render('faith-and-commitment');
});

app.post('/faith-and-commitment', urlencodedParser, function (req, res) {
  console.log(req.body);
  var tokencookie = req.cookies.token;
  let sql = `UPDATE ${config.databasetable}
    SET attendschoolgroup=?,
        attendchurchgroup=?,
        bestdescribesyou=?,
        moreinformation=?,
        growninfaith=?,
        growninfaithhow=?,
        helpunderstandfaith=?,
        helpunderstandfaithhow=?,
        camphelpdecision=?
    WHERE tokenid='${tokencookie}';`;
  let inserts = [
    `${req.body.attendschoolgroup}`,
    `${req.body.attendchurchgroup}`,
    `${req.body.bestdescribesyou}`,
    `${req.body.moreinformation}`,
    `${req.body.growninfaith}`,
    `${req.body.growninfaithhow}`,
    `${req.body.helpunderstandfaith}`,
    `${req.body.helpunderstandfaithhow}`,
    `${req.body.camphelpdecision}`
  ];
  sql = mysql.format(sql, inserts);

    connection.query (sql, function (err, result) {
      if (err) {
        throw err;
      } else {
        console.log(req.body);
        res.clearCookie('token');
        res.redirect('/submit');
      }
  });
});

//
// Survey Submission
//
app.get('/submit', function (req, res) {
  res.render('submit');
});

//
// Application Boot
//
app.listen(config.applicationlistenport, function() {
  console.log(chalk.yellow(`\n// CruTech Survey v.${package.version}\n`) + chalk.cyan(`GitHub Repository: ${package.homepage}\nCreated By: ${package.author}`));
  console.log(chalk.yellow('[CONSOLE] ' ) + 'Application is listening to the port ' + config.applicationlistenport);
});
