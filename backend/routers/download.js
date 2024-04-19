const path = require("path");
const config = require("../utils/config");
const router = require("express").Router();
const { getOriginalFileNameByFileName } = require("../models/File");

router.get("/:filename", async (req, res) => {
  const filename = req.params.filename;
  const directoryPath = path.resolve(config.FILE_PATH);
  const filePath = path.join(directoryPath, filename);

  try {
    const originalFileName = await getOriginalFileNameByFileName(filename);
    if (!originalFileName) {
      return res.status(404).send("File not found");
    }

    res.download(filePath, originalFileName, (err) => {
      if (err) {
        if (!res.headersSent) {
          res.status(404).send("File not found");
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
