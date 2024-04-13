const db = require("../utils/db");

async function createFile(messageId, file) {
  const sql = `INSERT INTO File (message_id, file_type, file_size, file_name) VALUES (?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(sql, [messageId, file.mimetype, file.size, file.filename], (err) => {
      if (err) {
        reject(err);
      }
      resolve(this.lastID);
    });
  });
}

module.exports = { createFile };
