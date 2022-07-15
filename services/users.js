import db from "../utils/db.js";
import bcrypt from "bcryptjs";
const saltRounds = 10;

export const login = (values) => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      const sql = "SELECT * FROM users WHERE email = ?";
      db.query(sql, values[0], (err, result) => {
        if (err) reject(err);
        if (result[0]) {
          bcrypt.compare(values[1], result[0].password, (error, response) => {
            if (response) {
              resolve(result);
            }
          });
        }
      });
    });
  });
};

export const insertUser = (userValue) => {
  db.connect((err) => {
    const sql = `INSERT INTO users (fname, lname, email, password) VALUES (?,?,?,?)`;
    db.query(sql, userValue, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  });
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      const sql = "SELECT * FROM users";
      db.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  });
};

export const updateUser = (values) => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      const sql =
        "UPDATE users SET fname = ?, lname = ?, email = ?, role = ? WHERE id_users = ?";
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        console.log(result);
      });
    });
  });
};
