const actionTypeModel = require("../models/ActionsType");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "preview_film",
};

const actionType = new actionTypeModel(dbConfig);
const sendErrorRes = (res, statusCode, message, error) => {
  res
    .status(statusCode)
    .json({ success: false, message, error: error.message });
};

const sendSuccessRes = (res, statusCode, message, data) => {
  res.status(statusCode).json({ message, data });
};

exports.getAllActionType = (req, res) => {
  actionType.getAllActionType((error, data) => {
    if (error) {
      sendErrorRes(res, 500, "Gagal Mengambil Data Categories", error);
    } else if (!data) {
      sendSuccessRes(res, 404, "Tidak Menemukan Data");
    } else {
      sendSuccessRes(res, 200, "Berhasil Mengambil Data Categories", data);
    }
  });
};

// Membuat kategori baru
exports.createActionType = (req, res) => {
  const actionTypeData = {
    id_user: req.body.id_user,
    action_type: req.body.action_type,
  };

  actionType.createActionType(actionTypeData, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: "Actions Type", id: result.insertId });
  });
};

// Mendapatkan kategori berdasarkan ID
exports.getActionTypeById = (req, res) => {
  const { id } = req.params;
  actionType.getActionTypeById(id, (error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (!data) {
      sendSuccessRes(res, 404, "Tidak Menemukan Data");
    } else {
      res
        .status(200)
        .json({ message: "Berhasil Mengambil Data Item Berdasarkan Id", data });
    }
  });
};
