create database crutechsurvey;
use crutechsurvey;
CREATE USER 'crutech'@'%' IDENTIFIED WITH mysql_native_password BY 'PasswordCruTech321';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
GRANT SELECT ON crutechsurvey.* TO crutech@'%';
GRANT INSERT ON crutechsurvey.* TO crutech@'%';
GRANT UPDATE ON crutechsurvey.* TO crutech@'%';

CREATE TABLE surveydata (
  tokenid VARCHAR(16) not null primary key,
  name TEXT,
  favcolour TEXT,
  school TEXT,
  schoolgrade TEXT,
  discussiongroup TEXT,
  emailaddress TEXT,
  reunionpermission VARCHAR(10),
  crupromotionpermission VARCHAR(10),
  campoverallrating VARCHAR(10),
  campfavouritething TEXT,
  campbebetter TEXT,
  leadersrating VARCHAR(10),
  leadersratingcomments TEXT,
  electivename TEXT,
  electivesrating VARCHAR(10),
  electiveratingcomments TEXT,
  oneshotname TEXT,
  oneshotrating VARCHAR(10),
  oneshotcomments TEXT,
  themenightrating VARCHAR(10),
  themenightcomments TEXT,
  shownightrating VARCHAR(10),
  shownightcomments TEXT,
  gamestratrating VARCHAR(10),
  gamestratcomments TEXT,
  outdoorgamesrating VARCHAR(10),
  outdoorgamescomments TEXT,
  discussiongrouprating VARCHAR(10),
  discussiongroupcomments TEXT,
  downloadoverallrating VARCHAR(10),
  downloadoverallcomments TEXT,
  downloadspeakerrating VARCHAR(10),
  downloadspeakercomments TEXT,
  downloadsingingrating VARCHAR(10),
  downloadsingingcomments TEXT,
  cabinsrating VARCHAR(10),
  cabinscomments TEXT,
  foodrating VARCHAR(10),
  foodcomments TEXT,
  freetimerating VARCHAR(10),
  freetimecomments TEXT,
  firstcrutech VARCHAR(10),
  anothercrutech VARCHAR(10),
  sumcrutechinasentence TEXT,
  newcampideas TEXT,
  firstcrucamp VARCHAR(10),
  anothercrucamp VARCHAR(10),
  recommendcrucamp VARCHAR(10),
  newfriendsoncamp VARCHAR(10),
  feelwelcomeandcared VARCHAR(10),
  feelwelcomeandcaredcomments TEXT,
  whycomeoncamp TEXT,
  whycomeoncampother TEXT,
  whynotcomeonmorecamps TEXT,
  whynotcomeonmorecampsother TEXT,
  attendschoolgroup TEXT,
  attendchurchgroup TEXT,
  bestdescribesyou TEXT,
  moreinformation TEXT,
  growninfaith VARCHAR(5),
  growninfaithhow TEXT,
  helpunderstandfaith VARCHAR(5),
  helpunderstandfaithhow TEXT,
  camphelpdecision TEXT
);
