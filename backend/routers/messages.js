const router = require("express").Router();
const upload = require("../utils/multerConfig");
const messageService = require("../models/Message");
const fileService = require("../models/File");
const { broadcastMessage } = require("../utils/websocketService");

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
    if (files && files.length > 0) {
      files.forEach(async (file) => {
        await fileService.createFile(messageId, file);
      });
    }

    const message = await messageService.getMessage(messageId);
    // 广播完整的消息对象
    broadcastMessage({ type: "newMessage", message: message });

    res.status(200).json({ data: message });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  const messageId = req.params.id;
  try {
    await messageService.deleteMessage(messageId);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
