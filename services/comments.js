import db from "../utils/db.js";

export const getComments = (id) => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      const sql =
        "SELECT * FROM comments LEFT JOIN users ON comments.id_users = users.id_users WHERE id_recette = ? AND valided = 1 ORDER BY id_comments DESC";
      db.query(sql, id, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  });
};

export const insertComment = (values) => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      const sql =
        "INSERT INTO comments (comment, valided, date, id_users, id_recette) VALUES (?, 0, now(), ?, ?)";
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  });
};

export const getCommentsNotValided = () => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      const sql =
        "SELECT * FROM comments LEFT JOIN users ON comments.id_users = users.id_users  LEFT JOIN recettes ON comments.id_recette = recettes.id_recette WHERE valided = 0 ORDER BY id_comments DESC";
      db.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  });
};

export const updateStatutComment = (id) => {
  db.connect((err) => {
    const sql = "UPDATE comments SET valided = 1 WHERE id_comments = ?";
    db.query(sql, id, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  });
};
