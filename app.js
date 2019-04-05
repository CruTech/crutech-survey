//
// Project Dependencies
//
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const ejs = require('ejs');
const sessions = require('express-session');
const mysql = require('mysql');

//
// Constants
//
const app = express();
const config = require('./config.json');
const package = require('./package.json');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var obj = {};
var session;

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

app.use(sessions({
  secret: config.sessionsecret,
  resave: false,
  saveUninitialized: true
}));

const connection = mysql.createConnection({
  host: config.databasehost,
  user: config.databaseuser,
  password: config.databasepassword,
  database: config.databasedatabase
});

connection.connect(function(err) {
  if (err) {
    console.error(chalk.red('[ERROR] ') + chalk.blue('[DB] ') +  'There was an error connecting:\n' + err.stack);
    return;
  }
  console.log(chalk.yellow('[CONSOLE] ' ) + chalk.blue('[DB] ') + 'Database connection is successful. Your connection ID is ' + connection.threadId + '.\n');
});

// Landing Page
app.get('/', function (req, res) {
  res.render('landing');
});

app.get('/getting-started', function (req, res) {
  res.render('getting-started');
});

app.post('/getting-started', urlencodedParser, function (req, res) {
  console.log(req.body);
  res.redirect('/camp-aspect');

  // let sql = `INSERT INTO ${config.databasetable} (name, link, description, image, category) VALUES ('${req.body.name}', '${req.body.link}', '${req.body.description}', '${req.body.Image}', '${req.body.category}')`;
  //   connection.query (sql, function (err, result) {
  //     if (err) {
  //       throw err;
  //     } else {
  //       console.log(req.body);
  //     }
  //   });
});

app.get('/camp-aspect', function (req, res) {
  res.render('camp-aspect');
});

app.post('/camp-aspect', urlencodedParser, function (req, res) {
  console.log(req.body);
  res.redirect('/camp-experience');

  // let sql = `INSERT INTO ${config.databasetable} (name, link, description, image, category) VALUES ('${req.body.name}', '${req.body.link}', '${req.body.description}', '${req.body.Image}', '${req.body.category}')`;
  //   connection.query (sql, function (err, result) {
  //     if (err) {
  //       throw err;
  //     } else {
  //       console.log(req.body);
  //     }
  //   });
});

app.get('/camp-experience', function (req, res) {
  res.render('camp-experience');
});

app.post('/camp-experience', urlencodedParser, function (req, res) {
  console.log(req.body);
  res.redirect('/faith-and-commitment');

  // let sql = `INSERT INTO ${config.databasetable} (name, link, description, image, category) VALUES ('${req.body.name}', '${req.body.link}', '${req.body.description}', '${req.body.Image}', '${req.body.category}')`;
  //   connection.query (sql, function (err, result) {
  //     if (err) {
  //       throw err;
  //     } else {
  //       console.log(req.body);
  //     }
  //   });
});

//
// Application Boot
//
app.listen(config.applicationlistenport);
console.log(chalk.yellow(`\n// CruTech Survey v.${package.version}\n`) + chalk.cyan(`GitHub Repository: ${package.homepage}\nCreated By: ${package.author}`));
console.log(chalk.yellow('[CONSOLE] ' ) + 'Application is listening to the port ' + config.applicationlistenport);
