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
require('./public/assets/js/functions.js');

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
  if (!tokencookie) {
    console.log(gentoken);
    res.cookie('token', gentoken);
  }

  // Insert token into the database
  let sql = `INSERT INTO ${config.databasetable} (tokenid) VALUES ('${gentoken}');`;
  connection.query (sql, function (err, result) {
    if (err) {
      throw err;
      } else {
        console.log(req.body);
        res.redirect('/getting-started');
        console.log('Success');
      }
    });
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
    SET name='${req.body.name}',
        favcolour='${req.body.favcolour}',
        school='${req.body.school}',
        schoolgrade='${req.body.schoolgrade}',
        discussiongroup='${req.body.discussiongroup}',
        emailaddress='${req.body.emailaddress}',
        reunionpermission='${req.body.reunionpermission}',
        crupromotionpermission='${req.body.crupromotionpermission}'
    WHERE tokenid='${tokencookie}';`;

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
  SET campoverallrating= '${req.body.campoverallrating}',
      campfavouritething='${req.body.campfavouritething}',
      campbebetter='${req.body.campbebetter}',
      leadersrating='${req.body.leadersrating}',
      leadersratingcomments='${req.body.leadersratingcomments}',
      electivename='${req.body.electivename}',
      electivesrating='${req.body.electivesrating}',
      electiveratingcomments='${req.body.electiveratingcomments}',
      oneshotname='${req.body.oneshotname}',
      oneshotrating='${req.body.oneshotrating}',
      oneshotcomments='${req.body.oneshotcomments}',
      themenightrating='${req.body.themenightrating}',
      themenightcomments='${req.body.themenightcomments}',
      shownightrating='${req.body.shownightrating}',
      shownightcomments='${req.body.shownightcomments}',
      gamestratrating='${req.body.gamestratrating}',
      gamestratcomments='${req.body.gamestratcomments}',
      outdoorgamesrating='${req.body.outdoorgamesrating}',
      outdoorgamescomments='${req.body.outdoorgamescomments}',
      discussiongrouprating='${req.body.discussiongrouprating}',
      discussiongroupcomments='${req.body.discussiongroupcomments}',
      downloadoverallrating='${req.body.downloadoverallrating}',
      downloadoverallcomments='${req.body.downloadoverallcomments}',
      downloadspeakerrating='${req.body.downloadspeakerrating}',
      downloadspeakercomments='${req.body.downloadspeakercomments}',
      downloadsingingrating='${req.body.downloadsingingrating}',
      downloadsingingcomments='${req.body.downloadsingingcomments}',
      cabinsrating='${req.body.cabinsrating}',
      cabinscomments='${req.body.cabinscomments}',
      foodrating='${req.body.foodrating}',
      foodcomments=${req.body.foodcomments},
      freetimerating='${req.body.freetimerating}',
      freetimecomments='${req.body.freetimecomments}'
    WHERE tokenid='${tokencookie}';`;

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
  let sql = `INSERT INTO ${config.databasetable} (firstcrutech, anothercrutech, sumcrutechinasentence, newcampideas, firstcrucamp, anothercrucamp, recommendcrucamp, newfriendsoncamp, feelwelcomeandcared, feelwelcomeandcaredcomments, whycomeoncamp, whynotcomeonmorecamps) VALUES ('${req.body.firstcrutech}, ${req.body.anothercrutech}, ${req.body.sumcrutechinasentence}, ${req.body.newcampideas}, ${req.body.firstcrucamp}, ${req.body.anothercrucamp}, ${req.body.recommendcrucamp}, ${req.body.newfriendsoncamp}, ${req.body.feelwelcomeandcared}, ${req.body.feelwelcomeandcaredcomments}, ${req.body.whycomeoncamp}, ${req.body.whynotcomeonmorecamps}')`;
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
  let sql = `INSERT INTO ${config.databasetable} (attendschoolgroup, attendchurchgroup, bestdescribesyou, growninfaith, growninfaithhow, helpunderstandfaith, helpunderstandfaithhow, camphelpdecision) VALUES ('${req.body.attendschoolgroup}, ${req.body.attendchurchgroup}, ${req.body.bestdescribesyou}, ${req.body.growninfaith}, ${req.body.growninfaithhow}, ${req.body.helpunderstandfaith}, ${req.body.helpunderstandfaithhow}, ${req.body.camphelpdecision}')`;
    connection.query (sql, function (err, result) {
      if (err) {
        throw err;
      } else {
        console.log(req.body);
        res.clearCookie('token', { path: '/' });
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
