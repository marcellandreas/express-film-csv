// models/user.js
const mysql = require("mysql2");

class User {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  registerUser(userData, callback) {
    const { username, password, full_name, email, role } = userData;
    const query =
      "INSERT INTO user (username, password, full_name, email, role ) VALUES (?, ?, ?, ?, ?)";
    this.connection.query(
      query,
      [username, password, full_name, email, role],
      (error, results) => {
        callback(error, results);
      }
    );
  }

  // Metode untuk mendapatkan
  getUserByUsername(username, callback) {
    const query = "SELECT * FROM user WHERE username = ?";
    this.connection.query(query, [username], (error, results) => {
      callback(error, results[0]);
    });
  }

  editUser(id_user, username, full_name, email, role, callback) {
    const query = `UPDATE user SET username = ?, full_name = ?, email = ?, role = ? WHERE id_user = ?`;

    this.connection.query(
      query,
      [username, full_name, email, role, id_user],
      (error, result) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, result);
      }
    );
  }

  // Metode untuk mendapatkan semua pengguna dengan informasi lengkap (termasuk kata sandi)
  getAllUsers(callback) {
    const query = "SELECT * FROM user";
    this.connection.query(query, (error, results) => {
      callback(error, results);
    });
  }

  deleteUser(id_user, callback) {
    const query = "DELETE FROM user WHERE id_user = ?";
    this.connection.query(query, [id_user], (error, results) => {
      callback(error, results);
    });
  }

  changePassword(username, newPassword, callback) {
    const query = "UPDATE user SET password = ? WHERE username = ?";
    this.connection.query(query, [newPassword, username], (error, results) => {
      if (error) {
        console.error(error); // Tambahkan ini untuk debugging
      }
      callback(error, results);
    });
  }

  // Metode untuk mengambil pengguna berdasarkan ID
  getUserByID(id_user, callback) {
    const query =
      "SELECT id_user, username, full_name, email, role FROM user WHERE id_user = ?";
    this.connection.query(query, [id_user], (error, results) => {
      if (results.length > 0) {
        callback(error, results[0]);
      } else {
        callback(error, null);
      }
    });
  }

  // Metode untuk mengambil data pengguna berdasarkan role
  getUserByRole(role, callback) {
    const query = "SELECT * FROM user WHERE role = ?";
    this.connection.query(query, [role], (error, results) => {
      callback(error, results);
    });
  }

  // Mengambil daftar peran pengguna tanpa duplikasi
  getUniqueRoles(callback) {
    const query = "SELECT DISTINCT role FROM user";
    this.connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        const roles = results.map((result) => result.role);
        callback(null, roles);
      }
    });
  }

  // Metode untuk mendapatkan data profile pengguna berdasarkan username
  getUserProfile(username, callback) {
    const query =
      "SELECT id_user, username, full_name, email, role FROM user WHERE username = ?";
    this.connection.query(query, [username], (error, results) => {
      callback(error, results[0]);
    });
  }

  // Metode untuk mengubah data profile pengguna
  updateUserProfile(id_user, full_name, email, callback) {
    const query = "UPDATE user SET full_name = ?, email = ? WHERE id_user = ?";
    this.connection.query(
      query,
      [full_name, email, id_user],
      (error, result) => {
        callback(error, result);
      }
    );
  }
}

module.exports = User;
