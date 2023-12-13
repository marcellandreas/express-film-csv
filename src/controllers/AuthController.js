// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/AuthModel");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "preview_film",
};

const user = new User(dbConfig);

exports.register = (req, res) => {
  const { username, password, full_name, email, role } = req.body;

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    user.registerUser(
      { username, password: hash, full_name, email, role },
      (error, results) => {
        if (error) {
          if (error.code === "ER_DUP_ENTRY") {
            if (error.message.includes("username")) {
              return res
                .status(409)
                .json({ message: "Username already exists" });
            } else if (error.message.includes("email")) {
              return res.status(409).json({ message: "Email already exists" });
            } else {
              return res.status(500).json({ message: error.message });
            }
          }
          return res.status(500).json({ message: error.message });
        } else {
          res.status(201).json({ message: "User registered successfully" });
        }
      }
    );
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Cari pengguna berdasarkan username
  user.getUserByUsername(username, (error, user) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!user) {
      return res.status(401).json({ message: "Pengguna tidak ditemukan" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result) {
        const token = jwt.sign(
          { username: user.username, role: user.role },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );

        return res.status(200).json({
          status: "success",
          message: "Otentikasi berhasil",
          data: {
            role: user.role,
            code_user: user.code_user,
            username: user.username,
            email: user.email,
            full_name: user.full_name,
            id_user: user.id_user,
            token: token,
          },
        });
      } else {
        return res.status(401).json({ message: "Kata sandi salah" });
      }
    });
  });
};

exports.deleteUser = (req, res) => {
  const { id_user } = req.params;
  user.deleteUser(id_user, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
};

// Metode untuk mengedit data pengguna
// exports.editUser = (req, res) => {
//   const { id_user } = req.params;
//   const { username, full_name, email, role } = req.body;

//   if (err) {
//     return res.status(500).json({ error: err.message });
//   }

//   user.editUser(
//     id_user,
//     { username, full_name, email, role },
//     (error, results) => {
//       if (error) {
//         return res.status(500).json({ error: error.message });
//       }

//       res.status(200).json({ message: "User updated successfully" });
//     }
//   );
// };

exports.editUser = async (req, res) => {
  const { id_user } = req.params;
  const { username, full_name, email, role } = req.body;

  try {
    await user.editUser(
      id_user,
      username,
      full_name,
      email,
      role,
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        } else {
          res.status(200).json({
            message: "User updated successfullya",
            data: {
              id_user,
              username,
              full_name,
              email,
              role,
            },
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = (req, res) => {
  user.getAllUsers((error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(results);
  });
};

exports.changePassword = (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  user.getUserByUsername(username, (error, user) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Memeriksa kata sandi lama
    bcrypt.compare(oldPassword, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      if (result) {
        // Kata sandi lama cocok, lanjutkan dengan mengganti kata sandi baru
        bcrypt.hash(newPassword, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          user.changePassword(username, hash, (error, results) => {
            if (error) {
              return res.status(500).json({ error: error.message });
            }

            res.status(200).json({ message: "Password changed successfully" });
          });
        });
      } else {
        return res.status(401).json({ message: "Authentication failed" });
      }
    });
  });
};

exports.getProfile = (req, res) => {
  const { username } = req.user;

  user.getUserByUsername(username, (error, userProfile) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    const { id, username, role } = userProfile;
    res.status(200).json({ id, username, role });
  });
};

// Mendapatkan data pengguna berdasarkan role
exports.getUserByRole = (req, res) => {
  const { role } = req.params;
  user.getUserByRole(role, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({
        message: "Berhasil Mengambil Data Pengguna Berdasarkan Role",
        data: results,
      });
    }
  });
};

// Metode untuk mengambil pengguna berdasarkan ID
exports.getUserByID = (req, res) => {
  const { id_user } = req.params;
  user.getUserByID(id_user, (error, userByID) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (userByID) {
      res.status(200).json(userByID);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
};

// Mendapatkan data pengguna dengan role 1 dan menampilkan kata sandi tanpa bcrypt
// exports.getUserByRole1 = (req, res) => {
//   user.getUserByRole1((error, results) => {
//     if (error) {
//       res.status(500).json({ message: "Server Error", serverMessage: error });
//     } else {
//       res.status(200).json({
//         message: "Berhasil Mengambil Data Pengguna Berdasarkan Role 1",
//         data: results,
//       });
//     }
//   });
// };

// Mengambil daftar peran pengguna tanpa duplikasi
exports.getUniqueRoles = (req, res) => {
  user.getUniqueRoles((error, roles) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({
        message: "Daftar Peran Pengguna Tanpa Duplikasi",
        data: roles,
      });
    }
  });
};

exports.getUserProfile = (req, res) => {
  const { username } = req.user; // Dapatkan username dari token JWT
  user.getUserProfile(username, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!result) {
      return res.status(404).json({ message: "User profile not found" });
    }
    res.status(200).json(result);
  });
};

exports.updateUserProfile = (req, res) => {
  const { id } = req.params; // Dapatkan id_user dari token JWT
  const { full_name, email } = req.body;

  user.updateUserProfile(id, full_name, email, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "User profile updated successfully" });
  });
};

// exports.changeUserPassword = (req, res) => {
//   const { id_user } = req.user; // Dapatkan id_user dari token JWT
//   const { oldPassword, newPassword } = req.body;

//   user.changeUserPassword(id_user, oldPassword, newPassword, (error, result) => {
//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }

//     if (!result.success) {
//       return res.status(400).json({ message: result.message });
//     }

//     res.status(200).json({ message: "Password changed successfully" });
//   });
// };
