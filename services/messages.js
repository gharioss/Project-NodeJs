import db from "../utils/db.js";

export const insertMessage = (values) => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      const sql = "INSERT INTO messages (email, message) VALUES (?,?)";
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  });
};

export const getMessages = () => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      const sql = "SELECT * FROM messages order by id_messages DESC";
      db.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  });
};
