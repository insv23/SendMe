const db = require("../utils/db");
const { deleteFile } = require("../utils/file");

async function createFile(messageId, file) {
  const sql = `INSERT INTO File (message_id, file_type, file_size, file_name, file_original_name) VALUES (?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(
      sql,
      [messageId, file.mimetype, file.size, file.filename, file.originalname],
      (err) => {
        if (err) {
          reject(err);
        }
        resolve(this.lastID);
      }
    );
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

async function deleteFileByMessageId(messageId) {
  // 找到messageId对应的所有file
  let sql = `SELECT file_name FROM File WHERE message_id = ?`;
  const files = await new Promise((resolve, reject) => {
    db.all(sql, [messageId], (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });

  // 删除文件系统中的文件
  await Promise.all(files.map((file) => deleteFile(file.file_name)));

  // 删除数据库中的文件记录
  sql = `DELETE FROM File WHERE message_id = ?`;
  return new Promise((resolve, reject) => {
    db.run(sql, [messageId], (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

async function getAllFileNames() {
  const sql = `SELECT file_name FROM File`;
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows.map((row) => row.file_name));
    });
  });
}

module.exports = {
  createFile,
  getOriginalFileNameByFileName,
  deleteFileByMessageId,
  getAllFileNames,
};
