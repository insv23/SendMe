const fs = require("fs");
const path = require("path");
const config = require("./config");
const { rejects } = require("assert");

function deleteFile(fileName) {
  const filePath = path.join(config.FILE_PATH, fileName);
  return new Promise((resovle, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete file: ${filePath}`, err);
        reject(err);
      } else {
        console.log(`Successfully deleted file: ${filePath}`);
        resovle();
      }
    });
  });
}

module.exports = {
  deleteFile,
};
