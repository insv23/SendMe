const cron = require("node-cron");
const fs = require("fs").promises;
const path = require("path");
const config = require("./config");

const { getExpiredMessages, deleteMessage } = require("../models/Message");
const { getAllFileNames } = require("../models/File");

async function cleanupUnusedFiles() {
  try {
    // 获取数据库中所有有效的文件名
    const filesInDb = await getAllFileNames();

    // 读取文件系统中的文件
    const filesInDirectory = await fs.readdir(config.FILE_PATH);
    const filesToDelete = filesInDirectory.filter(
      (file) => !filesInDb.includes(file)
    );

    // 删除不在数据库中的文件
    for (const file of filesToDelete) {
      const filePath = path.join(config.FILE_PATH, file);
      await fs.unlink(filePath);
      console.log(`Deleted unused file: ${file}`);
    }
  } catch (error) {
    console.error("Error during cleanup of unused files:", error);
  }
}

// 每天凌晨 4:13(UTC 20:13) 执行任务
cron.schedule("13 20 * * *", async () => {
  console.log("Running a daily check for expired messages at 4:00 AM...");

  try {
    // 删除过期消息及其文件
    const expiredMessages = await getExpiredMessages();
    for (const message of expiredMessages) {
      await deleteMessage(message.id);
      console.log(`Deleted message with ID: ${message.id}`);
    }

    // 清理不在数据库中的文件
    await cleanupUnusedFiles();
  } catch (error) {
    console.error("Error during cleanup of expired messages:", error);
  }
});
