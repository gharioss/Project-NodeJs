import db from "../utils/db.js";

export const getRecipes = () => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      const sql =
        "SELECT recettes.*, users.*, category.*, ifnull(t1.countComment,0) as countComment FROM recettes LEFT JOIN (SELECT comments.id_recette, COUNT(comments.id_recette) as countComment from comments WHERE comments.valided = 1 GROUP BY comments.id_recette) as t1 ON t1.id_recette = recettes.id_recette INNER JOIN users on recettes.id_users = users.id_users INNER JOIN category ON recettes.id_category = category.id_category GROUP BY recettes.id_recette ORDER BY recettes.id_recette DESC";
      db.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  });
};

export const getRecipe = (id) => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      const sql =
        "SELECT * FROM recettes LEFT JOIN users ON recettes.id_users = users.id_users LEFT JOIN category ON recettes.id_category = category.id_category WHERE id_recette = ?";
      db.query(sql, id, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  });
};

export const getLastRecipeFromUser = (id) => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      const sql =
        "SELECT * FROM recettes WHERE id_users = ? ORDER BY id_recette DESC LIMIT 1";
      db.query(sql, id, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  });
};

export const insertRecipe = (values) => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      const sql =
        "INSERT INTO recettes (titre, content, img, id_category, date, id_users) VALUES (?,?,?,?,now(),?)";
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  });
};

export const deleteRecipes = (id) => {
  db.connect((err) => {
    const sql = `DELETE FROM recettes WHERE id_recette = ?`;
    console.log("this is the id" + id);
    db.query(sql, parseInt(id), (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  });
};
