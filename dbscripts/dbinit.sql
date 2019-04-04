create database crutechsurveydb;
use crutechsurveydb;
CREATE TABLE surveydata (
  id int(50) not null auto_increment primary key,
  name TEXT,
  favcolour TEXT,
  school TEXT,
  schoolgrade TEXT,
  discussiongroup TEXT,
  emailaddress TEXT,
  reunionpermission VARCHAR(20),
  crupromotionpermisison VARCHAR(20),
  campoverallrating VARCHAR(20),
  campfavouritething TEXT,
  campbebetter TEXT,
  leadersrating VARCHAR(20),
  leadersratingcomments TEXT,
  electivename TEXT,
  electivesrating VARCHAR(20),
  electiveratingcomments TEXT,
  oneshotname VARCHAR(500),
  oneshotrating VARCHAR(20),
  oneshotcomments TEXT,
  themenightrating VARCHAR(20),
  themenightcomments TEXT,
  shownightrating VARCHAR(20),
  shownightcomments TEXT,
  gamestratrating VARCHAR(20),
  gamestratcomments TEXT,
  outdoorgamesrating VARCHAR(20),
  outdoorgamescomments TEXT,
  discussiongrouprating VARCHAR(20),
  discussiongroupcomments TEXT,
  downloadoverallrating VARCHAR(20),
  downloadoverallcomments TEXT,
  downloadspeakerrating VARCHAR(20),
  downloadspeakercomments TEXT,
  downloadsingingrating VARCHAR(20),
  downloadsingingcomments TEXT,
  cabinsrating VARCHAR(20),
  cabinscomments TEXT,
  foodrating VARCHAR(20),
  foodcomments TEXT,
  freetimerating VARCHAR(20),
  freetimecomments TEXT,
  firstcrutech VARCHAR(20),
  anothercrutech VARCHAR(20),
  sumcrutechinasentence TEXT,
  newcampideas TEXT,
  firstcrucamp VARCHAR(20),
  anothercrucamp VARCHAR(20),
  recommendcrucamp VARCHAR(20),
  newfriendsoncamp VARCHAR(20),
  feelwelcomeandcared VARCHAR(20),
  feelwelcomeandcaredcomments TEXT,
  whycomeoncamp TEXT,
  whynotcomeonmorecamps TEXT,
  attendschoolgroup VARCHAR(20),
  attendchurchgroup VARCHAR(20),
  bestdescribesyou TEXT,
  moreinformationabout TEXT,
  growninfaith VARCHAR(20),
  growninfaithhow TEXT,
  helpunderstandfaith VARCHAR(20),
  helpunderstandfaithhow TEXT,
  camphelpdecision TEXT
);