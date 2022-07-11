import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { MemoryStore } from "express-session";

import mainRouter from "./controller/main.js";
import contactRouter from "./controller/contact.js";
import userRouter from "./controller/user.js";
import adminRouter from "./controller/admin.js";
import commentsRouter from "./controller/comments.js";

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    key: "is_logged",
    secret: "secretkey",
    saveUninitialized: false,
    resave: false,
    store: new MemoryStore(),
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  })
);

app.use(
  session({
    key: "cookie-user",
    secret: "thisIsASecret",
    saveUninitialized: false,
    resave: false,
    store: new MemoryStore(),
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  })
);

app.use((req, res, next) => {
  res.locals.cookie_is_logged = req.session.user;
  next();
});

app.use("/", mainRouter);

app.use("/contact", contactRouter);

app.use("/user", userRouter);

app.use("/admin", adminRouter);

app.use("/comments", commentsRouter);

app.listen(process.env.PORT || 8080);
