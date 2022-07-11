import express from "express";
import multer from "multer";
import path from "path";
import { getComments } from "../services/comments.js";
import {
  getRecipes,
  getLastRecipeFromUser,
  getRecipe,
  insertRecipe,
} from "../services/recipes.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/pictures");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

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

router.get("/addRecipe", async (req, res) => {
  res.render("adminAddRecipe");
});

router.post("/add", upload.single("imageRecipe"), async (req, res) => {
  const titre = req.body.titre;
  const contenu = req.body.contenu;
  const filename = req.file.filename;
  const category = req.body.category;
  const user = req.session.user[0].id_users;

  const values = [titre, contenu, filename, category, user];

  insertRecipe(values);

  res.render("adminAddRecipe");
});

export default router;
