// Connect to the database
const sqlite3 = require("sqlite3");
const config = require("../utils/config");

const db = new sqlite3.Database(config.SQLITE_URL, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the database.");
  }
});

module.exports = db;
