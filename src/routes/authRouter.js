// routers/authRouter.js
const express = require("express");
const authController = require("../controllers/AuthController.js");

const router = express.Router();
const { verifyAccessToken: token } = require("../middleware/Verify-jwt.js");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.delete("/user/:id_user", token, authController.deleteUser);
router.get("/allusers", token, authController.getAllUsers);
router.get("/user/:id_user", token, authController.getUserByID);
router.get("/user/role/:role", token, authController.getUserByRole);
router.get("/unique", token, authController.getUniqueRoles);
router.get("/profile", token, authController.getUserProfile);

router.put("/user/:id_user", token, authController.editUser);
router.put("/profile/:id", token, authController.updateUserProfile);
// role1 gk kepakai
// router.get("/user/role1", token, authController.getUserByRole1);
// router.post("/changepassword", token ,authController.changePassword);

// Rute untuk mengambil daftar peran pengguna tanpa duplikasi

module.exports = router;
