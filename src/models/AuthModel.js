// models/user.js
const mysql = require("mysql2");

class User {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  registerUser(userData, callback) {
    const { username, password, full_name, email, role } = userData;
    // Generate user code based on role
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

  // Metode untuk mengedit data pengguna berdasarkan id_user
  // editUser(id_user, userData, callback) {
  //   const { username, role, full_name, email } = userData;
  //   const query =
  //     "UPDATE user SET username = ?, full_name = ?, email = ?, role = ? WHERE id_user = ?";
  //   this.connection.query(
  //     query,
  //     [username, full_name, email, role, id_user],
  //     (error, results) => {
  //       callback(error, results);
  //     }
  //   );
  // }

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

  // Metode untuk mengubah kata sandi pengguna
  // changeUserPassword(id_user, oldPassword, newPassword, callback) {
  //   // Dapatkan kata sandi lama dari database berdasarkan id_user
  //   const getPasswordQuery = "SELECT password FROM user WHERE id_user = ?";
  //   this.connection.query(getPasswordQuery, [id_user], (error, results) => {
  //     if (error) {
  //       return callback(error, null);
  //     }

  //     if (results.length === 0) {
  //       return callback(null, { success: false, message: "User not found" });
  //     }

  //     const storedPassword = results[0].password;

  //     // Bandingkan kata sandi lama yang dimasukkan dengan kata sandi yang tersimpan
  //     bcrypt.compare(oldPassword, storedPassword, (compareError, compareResult) => {
  //       if (compareError) {
  //         return callback(compareError, null);
  //       }

  //       if (!compareResult) {
  //         return callback(null, { success: false, message: "Incorrect old password" });
  //       }

  //       // Hash kata sandi baru sebelum menyimpannya di database
  //       bcrypt.hash(newPassword, 10, (hashError, hashedPassword) => {
  //         if (hashError) {
  //           return callback(hashError, null);
  //         }

  //         // Update kata sandi baru di database
  //         const updatePasswordQuery = "UPDATE user SET password = ? WHERE id_user = ?";
  //         this.connection.query(updatePasswordQuery, [hashedPassword, id_user], (updateError, updateResult) => {
  //           callback(updateError, { success: true, message: "Password updated successfully" });
  //         });
  //       });
  //     });
  //   });
  // }
}

module.exports = User;
