const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadFiles } = require("../controllers/uploadController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, Date.now() + "-" + baseName + ext); // simpan dengan extension
  },
});

// Validasi file: hanya pdf, docx, txt
function fileFilter(req, file, cb) {
  const allowed = [".pdf", ".docx", ".txt"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowed.includes(ext)) {
    return cb(new Error("Only PDF, DOCX, and TXT files are allowed"));
  }
  cb(null, true);
}

const upload = multer({ storage, fileFilter });

router.post(
  "/upload",
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "project", maxCount: 1 },
  ]),
  uploadFiles
);

module.exports = router;
