import express from "express";
import {
  getCommentsNotValided,
  insertComment,
  updateStatutComment,
} from "../services/comments.js";
const router = express.Router();

router.get("/valid", async (req, res) => {
  const allComments = await getCommentsNotValided();
  res.render("adminComment", { comments: allComments });
});

router.get("/valid/:id", (req, res) => {
  const id = req.params.id;

  updateStatutComment(id);
  res.redirect("/comments/valid");
});

router.post("/addComment", (req, res) => {
  const id_recipe = req.body.id;
  const values = [req.body.comment, req.session.user[0].id_users, id_recipe];

  insertComment(values);

  res.redirect("/details/" + id_recipe);
});

export default router;
