const express = require("express");
const {
  createChat,
  userChats,
  findChat,
} = require("../controllers/chatController");
const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
