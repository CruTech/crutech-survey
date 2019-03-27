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
  console.log(chalk.yellow('[CONSOLE] ' ) + chalk.blue('[DB] ') + 'Database connection is successful. Your connection ID is ' + connection.threadId + '.');
});

// Landing Page
app.get('/', function (req, res) {
  res.render('landing');
});

//
app.post('/', urlencodedParser, function (req, res) {
  console.log(req.body);

  let sql = `INSERT INTO ${config.databasetablename} (firstname, lastname) VALUES ('${req.body.firstname}', '${req.body.lastname}');`;
    connection.query (sql, function (err, result) {
      if (err) {
        throw err;
      } else {
        console.log(chalk.blue('[DB] ') + `The following record has been inserted into the database successfully.`);

        let sql = `SELECT * FROM surveydata WHERE id=${result.insertId}`;
        connection.query (sql, function (err, result) {
          if (err) {
            throw err;
          } else {
            obj = {objdata: result};
            res.render('survey', obj);
          };
        });
      };
    });
});

app.post('/processsurvey', urlencodedParser, function (req, res) {
  console.log(req.body);
  res.render('complete');
});

//
// Application Boot
//
app.listen(config.applicationlistenport);
console.log(chalk.yellow('[CONSOLE] ' ) + 'Application is listening to the port ' + config.applicationlistenport);
