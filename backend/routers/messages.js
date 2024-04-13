const router = require("express").Router();
const upload = require("../utils/multerConfig");
const messageService = require("../models/Message");
const fileService = require("../models/File");

router.get("/", async (req, res) => {
  try {
    const groupedMessages = await messageService.getMessages();
    res.status(200).json({ data: groupedMessages });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:messageId", async (req, res) => {
  const messageId = req.params.messageId;
  try {
    const message = await messageService.getMessage(messageId);
    res.status(200).json({ data: message });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", upload.array("files"), async (req, res) => {
  const text = req.body.text ? req.body.text.trim() : null;
  const files = req.files;
  try {
    const messageId = await messageService.createMessage(text);
    if (files) {
      files.forEach(async (file) => {
        await fileService.createFile(messageId, file);
      });
    }

    const message = await messageService.getMessage(messageId);
    res.status(200).json({ data: message });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
