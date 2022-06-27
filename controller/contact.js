import express from "express";
import { getMessages, insertMessage } from "../services/messages.js";
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("contact");
});

router.post("/contact", (req, res) => {
  const values = [req.body.email, req.body.message];

  insertMessage(values);

  res.redirect("/contact");
});

router.get("/messages", async (req, res) => {
  const get_messages = await getMessages();
  res.render("adminContact", { messages: get_messages });
});

export default router;
