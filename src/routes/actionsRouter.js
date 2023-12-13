const express = require("express");
const router = express.Router();
const actionType = require("../controllers/ActionsType.js");
const { verifyAccessToken } = require("../middleware/Verify-jwt.js");

router.use(verifyAccessToken);
// Menampilkan semua kategori
router.get("/", actionType.getAllActionType);
// Membuat kategori baru
router.post("/", actionType.createActionType);
// Mendapatkan kategori berdasarkan ID
router.get("/:id", actionType.getActionTypeById);

module.exports = router;
