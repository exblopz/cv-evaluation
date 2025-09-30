const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadFiles } = require('../controllers/uploadController');

const router = express.Router();

// Daftar ekstensi yang diizinkan
const allowedExt = ['.pdf', '.docx', '.txt'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder tujuan
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext);
    cb(null, Date.now() + '-' + baseName + ext);
  }
});

// Filter file
function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExt.includes(ext)) {
    return cb(new Error(`File type not allowed: ${ext}`), false);
  }
  cb(null, true);
}

const upload = multer({ storage, fileFilter });

router.post(
  '/upload',
  upload.fields([{ name: 'cv' }, { name: 'project' }]),
  uploadFiles
);

module.exports = router;
