const mysql = require("mysql2");

class ActionTypeModal {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  // Metode untuk mengambil semua data kategori
  getAllActionType(callback) {
    const query = "SELECT * FROM user_actions";
    this.connection.query(query, (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk menambahkan kategori baru
  createActionType(actionType, callback) {
    const query =
      "INSERT INTO user_actions (id_user, action_type) VALUES (?, ?)";
    this.connection.query(
      query,
      [actionType.id_user, actionType.action_type],
      (error, result) => {
        callback(error, result);
      }
    );
  }

  // Metode untuk mengambil kategori berdasarkan ID
  getActionTypeById(userId, callback) {
    const query = "SELECT * FROM user_actions WHERE id_user = ?";
    this.connection.query(query, [userId], (error, result) => {
      callback(error, result[0]); // Mengambil hasil pertama karena id adalah unik
    });
  }
}

module.exports = ActionTypeModal;
