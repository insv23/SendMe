const db = require("../utils/db");
const config = require("../utils/config");
const { deleteFileByMessageId } = require("../models/File");

async function createMessage(text) {
  const sql = `INSERT INTO Message (creation_time, expiration_time, text) VALUES (?, ?, ?)`;

  const creationTime = new Date().toISOString();
  const expirationTime = new Date(
    Date.now() + config.MESSAGE_LIFETIME_HOURS * 60 * 60 * 1000
  ).toISOString();

  // 返回Promise以便可以使用async/await
  return new Promise((resolve, reject) => {
    db.run(sql, [creationTime, expirationTime, text], function (err) {
      if (err) {
        reject(err);
      }
      resolve(this.lastID);
    });
  });
}

async function getMessages() {
  const sql = `SELECT
    m.id as message_id,
    m.creation_time as message_creation_time,
    m.text as message_text,
    f.id as file_id,
    f.file_type,
    f.file_size,
    f.file_name,
    f.file_original_name
  FROM
    Message m
    LEFT JOIN File f ON m.id = f.message_id
  WHERE
    m.expiration_time > ?
  ORDER BY
    m.creation_time
  `;

  const currentTime = new Date().toISOString();
  return new Promise((resolve, reject) => {
    db.all(sql, [currentTime], (err, rows) => {
      if (err) {
        reject(err);
      }

      // 处理结果，组装成所需的格式
      const groupedMessages = rows.reduce((acc, row) => {
        // Check the current row is already in the acc
        let message = acc.find((m) => m.message_id === row.message_id);
        if (!message) {
          // If not, create a new message and add it to the acc
          message = {
            message_id: row.message_id,
            message_creation_time: row.message_creation_time,
            message_text: row.message_text,
            message_files: [],
          };
          acc.push(message);
        }

        if (row.file_id) {
          message.message_files.push({
            file_id: row.file_id,
            file_type: row.file_type,
            file_size: row.file_size,
            file_name: row.file_name,
            file_original_name: row.file_original_name,
          });
        }

        return acc;
      }, []);

      resolve(groupedMessages);
    });
  });
}

async function getMessage(messageId) {
  const sql = `
    SELECT
      m.id as message_id,
      m.creation_time as message_creation_time,
      m.text as message_text,
      f.id as file_id,
      f.file_type,
      f.file_size,
      f.file_name,
      f.file_original_name
    FROM
      Message m
      LEFT JOIN File f ON m.id = f.message_id
    WHERE
      m.id = ?
  `;

  return new Promise((resolve, reject) => {
    db.all(sql, [messageId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      // 处理结果，组装成所需的格式
      const result = rows.reduce(
        (acc, row) => {
          // 如果累积对象acc还没有message_id属性，这意味着这是第一次迭代。
          // 设置acc的message_id和message_text属性，并初始化message_files为空数组。
          if (!acc.message_id) {
            acc.message_id = row.message_id;
            acc.message_creation_time = row.message_creation_time;
            acc.message_text = row.message_text;
            acc.message_files = [];
          }

          // 如果row.file_id不为null，说明它有一个关联的文件
          if (row.file_id) {
            acc.message_files.push({
              file_id: row.file_id,
              file_type: row.file_type,
              file_size: row.file_size,
              file_name: row.file_name,
              file_original_name: row.file_original_name,
            });
          }

          return acc;
        },
        {
          message_id: null,
          message_creation_time: null,
          message_text: null,
          message_files: [],
        }
      );

      resolve(result);
    });
  });
}

async function deleteMessage(messageId) {
  // 删除文件系统中的文件 and 数据库中的文件记录
  await deleteFileByMessageId(messageId);

  // 删除数据库中的message记录
  const sql = `DELETE FROM Message WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(sql, [messageId], (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

module.exports = { createMessage, getMessages, getMessage, deleteMessage };
