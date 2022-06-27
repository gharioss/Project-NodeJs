import express from "express";
import { deleteRecipes, getRecipes } from "../services/recipes.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const get_recipes = await getRecipes();
  res.render("adminMain", { recipes: get_recipes });
});

router.get("/delete/:id", (req, res) => {
  const deleteRecipe = [req.params.id];

  deleteRecipes(deleteRecipe);
  res.redirect("/admin");
});

export default router;
