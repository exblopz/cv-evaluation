const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

async function extractText(file) {
  const filePath = file.path;
  const ext = file.originalname.split('.').pop().toLowerCase();

  if (ext === 'pdf') {
    const data = await pdfParse(fs.readFileSync(filePath));
    return data.text;
  } else if (ext === 'docx') {
    const data = await mammoth.extractRawText({ path: filePath });
    return data.value;
  } else if (ext === 'txt') {
    return fs.readFileSync(filePath, 'utf8');
  } else {
    throw new Error('Unsupported file type');
  }
}

module.exports = { extractText };
