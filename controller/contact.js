import express from "express";
import { getMessages, insertMessage } from "../services/messages.js";
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("contact");
});

router.post("/contact", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const message = req.body.message;

  const values = [email, message];

  const insert_message = await insertMessage(values);

  console.log(insert_message);

  res.send({ message: insert_message });
});

router.get("/messages", async (req, res) => {
  const get_messages = await getMessages();
  res.render("adminContact", { messages: get_messages });
});

export default router;
