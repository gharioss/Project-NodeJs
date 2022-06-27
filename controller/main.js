import express from "express";
import { getComments } from "../services/comments.js";
import {
  getRecipes,
  getLastRecipeFromUser,
  getRecipe,
} from "../services/recipes.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const get_recipes = await getRecipes();
  let last_recipe_from_user;
  if (req.session.user)
    last_recipe_from_user = await getLastRecipeFromUser(
      req.session.user[0].id_users
    );
  res.render("main", {
    recipes: get_recipes,
    last_recipe: last_recipe_from_user,
  });
});

router.get("/recipes", async (req, res) => {
  const get_recipes = await getRecipes();
  res.render("recipes", { recipes: get_recipes });
});

router.get("/details/:id", async (req, res) => {
  const id = req.params.id;
  const get_recipe = await getRecipe(id);
  const get_comments = await getComments(id);

  res.render("details", { recipes: get_recipe, comments: get_comments });
});

router.get("/about", async (req, res) => {
  res.render("about");
});

export default router;
