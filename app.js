//
// Project Dependencies
//
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const ejs = require('ejs');
const sessions = require('express-session');
const mysql = require('mysql');
const randtoken = require('rand-token');
const cookieParser = require('cookie-parser');

//
// Constants
//
const app = express();
const config = require('./config.json');
const package = require('./package.json');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var obj = {};

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
  let cookie = req.cookies['token'];
  let gentoken = randtoken.generate(16);

  res.cookie('token', `${gentoken}`, {
    maxAge: 7200000, // 2 hours
    httpOnly: true // http only, prevents JavaScript cookie access
  });

  // Insert token into the database
  let sql = `INSERT INTO ${config.databasetable} (tokenid) VALUES ('${cookie}');`;
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
  let sql = `UPDATE ${config.databasetable} SET
  name='${req.body.name}',
  favcolour='${req.body.favcolour}',
  school='${req.body.school}',
  schoolgrade='${req.body.schoolgrade}',
  discussiongroup='${req.body.discussiongroup}',
  emailaddress='${req.body.emailaddress}',
  reunionpermission='${req.body.reunionpermission}',
  crupromotionpermission='${req.body.crupromotionpermission}'
  WHERE tokenid='${req.cookies['token']}';`;

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
let sql = `INSERT INTO ${config.databasetable} (campoverallrating,campfavouritething, campbebetter, leadersrating, leadersratingcomments, electivename, electivesrating, electiveratingcomments, oneshotname, oneshotrating, oneshotcomments, themenightrating, themenightcomments, shownightrating, shownightcomments, gamestratrating, gamestratcomments, outdoorgamesrating, outdoorgamescomments, discussiongrouprating, discussiongroupcomments, downloadoverallrating, downloadoverallcomments, downloadspeakerrating, downloadspeakercomments, downloadsingingrating, downloadsingingcomments, cabinsrating, cabinscomments, foodrating, foodcomments, freetimerating, freetimecomments) VALUES ('${req.body.campoverallrating}, ${req.body.campfavouritething}, ${req.body.campbebetter}, ${req.body.leadersrating}, ${req.body.leadersratingcomments}, ${req.body.electivename}, ${req.body.electivesrating}, ${req.body.electiveratingcomments}, ${req.body.oneshotname}, ${req.body.oneshotrating}, ${req.body.oneshotcomments}, ${req.body.themenightrating}, ${req.body.themenightcomments}, ${req.body.shownightrating}, ${req.body.shownightcomments}, ${req.body.gamestratrating}, ${req.body.gamestratcomments}, ${req.body.outdoorgamesrating}, ${req.body.outdoorgamescomments}, ${req.body.discussiongrouprating}, ${req.body.discussiongroupcomments}, ${req.body.downloadoverallrating}, ${req.body.downloadoverallcomments}, ${req.body.downloadspeakerrating}, ${req.body.downloadspeakercomments}, ${req.body.downloadsingingrating}, ${req.body.downloadsingingcomments}, ${req.body.cabinsrating}, ${req.body.cabinscomments}, ${req.body.foodrating}, ${req.body.foodcomments}, ${req.body.freetimerating}, ${req.body.freetimecomments}')`;
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
app.listen(config.applicationlistenport);
console.log(chalk.yellow(`\n// CruTech Survey v.${package.version}\n`) + chalk.cyan(`GitHub Repository: ${package.homepage}\nCreated By: ${package.author}`));
console.log(chalk.yellow('[CONSOLE] ' ) + 'Application is listening to the port ' + config.applicationlistenport);
