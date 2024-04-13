const multer = require("multer");
const path = require("path");
const config = require("./config"); // 确保路径正确

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.FILE_PATH); // 使用config中的文件存储路径
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now().toString() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.originalname.replace(ext, "") + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
