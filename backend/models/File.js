const db = require("../utils/db");

async function createFile(messageId, file) {
  const sql = `INSERT INTO File (message_id, file_type, file_size, file_name, file_original_name) VALUES (?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(sql, [messageId, file.mimetype, file.size, file.filename, file.originalname], (err) => {
      if (err) {
        reject(err);
      }
      resolve(this.lastID);
    });
  });
}

async function getOriginalFileNameByFileName(fileName) {
  const sql = `SELECT file_original_name FROM File WHERE file_name = ?`;
  return new Promise((resolve, reject) => {
    db.get(sql, [fileName], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row ? row.file_original_name : null);
      }
    });
  });
}

module.exports = { createFile, getOriginalFileNameByFileName };
