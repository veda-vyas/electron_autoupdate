// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('./database.sqlite3');
// db.serialize(function() {
//   db.run("CREATE TABLE UserActivity (info TEXT)");
// });
// var stmt = db.prepare("INSERT INTO UserActivity VALUES (?)");
// stmt.run("This is my First DB Entry")
// stmt.finalize();
// db.close();

var config = require('../knexfile.js');
var env = 'development';
var knex = require('knex')(config[env]);

// knex.insert({info: "Main window Launched"}).into("UserActivity").then(function (id) {
//   console.log(id);
// })
// .finally(function() {
//   knex.destroy();
// });

module.exports = knex;

knex.migrate.latest([config]);
