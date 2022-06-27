import express from "express";
import { getUsers, login, updateUser } from "../services/users.js";
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("login");
});

router.get("/register", async (req, res) => {
  res.render("register");
});

router.post("/login", async (req, res) => {
  const values = [req.body.email, req.body.password];

  const user = await login(values);
  if (user) {
    req.session.user = user;

    res.redirect("/");
  }
});

router.get("/getAll", async (req, res) => {
  const allUsers = await getUsers();

  res.render("adminUsers", { users: allUsers });
});

router.post("/edit/:id", async (req, res) => {
  const values = [
    req.body.fname,
    req.body.lname,
    req.body.email,
    req.body.role,
    req.body.id,
  ];

  const update = updateUser(values);

  res.redirect("/user/getAll");
});

router.get("/logout", (req, res) => {
  res.clearCookie("is_logged");
  res.redirect("/");
});

export default router;
