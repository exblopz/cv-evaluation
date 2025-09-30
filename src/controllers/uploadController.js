const { v4: uuidv4 } = require("uuid");
const { extractText } = require("../utils/fileExtractor");

// Simpan sementara di memory
let uploads = {};

async function uploadFiles(req, res, next) {
  try {
    if (!req.files.cv || !req.files.project) {
      return res
        .status(400)
        .json({ error: "CV and Project report are required" });
    }

    // Ambil teks dari file
    const cvText = await extractText(req.files.cv[0]);
    const projectText = await extractText(req.files.project[0]);

    // Buat uploadId
    const uploadId = uuidv4();
    uploads[uploadId] = { cv: cvText, project: projectText };

    res.json({ id: uploadId, message: "Upload & extraction successful" });
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadFiles, uploads };
