require("dotenv").config();

const PORT = process.env.PORT || 3001;

const SQLITE_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_SQLITE_URL
    : process.env.SQLITE_URL || "missing_sqlite.sqlite";

const FILE_PATH = process.env.FILE_PATH || "./database/uploads";

const MESSAGE_LIFETIME_HOURS = parseInt(process.env.MESSAGE_LIFETIME_HOURS, 10) || 1 * 60 * 60 * 1000;

module.exports = { PORT, SQLITE_URL, FILE_PATH, MESSAGE_LIFETIME_HOURS };
