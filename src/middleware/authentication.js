// middleware/authentication.js
const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const token = req.headers.authorization; // Misalnya, token dikirim dalam header "Authorization"

  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token tidak valid" });
    }

    req.user = user; // Menyimpan informasi pengguna dalam objek req untuk digunakan dalam controller
    next();
  });
}

module.exports = authenticateJWT;
