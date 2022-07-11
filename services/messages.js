import db from "../utils/db.js";

export const insertMessage = (values) => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (!values[0] && !values[1]) {
        resolve(
          "Error : Vous devez rentrer votre email et le message que vous souhaitez envoyer."
        );
      } else if (!values[0]) {
        resolve("Error : Vous devez rentrer votre email");
      } else if (!values[1]) {
        resolve("Error : Vous devez rentrer un message");
      } else {
        const sql = "INSERT INTO messages (email, message) VALUES (?,?)";
        db.query(sql, values, (err, result) => {
          if (err) reject(err);
          resolve("Success : Message bien envoyé.");
        });
      }
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
