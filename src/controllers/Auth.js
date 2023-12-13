const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModal = require("../models/AuthModel");
const { error, result } = require("@hapi/joi/lib/base");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "preview_film",
};

const user = new userModal(dbConfig);

exports.register = (req, res) => {
  const { username, password, full_name, email, role } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    user.registerUser(
      { username, password: hash, full_name, email, role },
      (error, results) => {
        if (error) {
          return res;
        }
      }
    );
  });
};
