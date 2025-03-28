const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const validImageTypes = ['.png', '.jpg', '.jpeg', '.bmp', '.tiff'];

exports.performOCR = async (filePath, mimetype) => {
  const ext = path.extname(filePath).toLowerCase();
  console.log();

  try {
    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return {
        text: data.text,
        confidence: 1.0,
      };
    }

    if (ext === '.docx') {
      const result = await mammoth.extractRawText({ path: filePath });
      return {
        text: result.value,
        confidence: 1.0,
      };
    }

    if (validImageTypes.includes(ext)) {
      const result = await Tesseract.recognize(filePath, 'eng', {
        logger: m => console.log(m)
      });

      return {
        text: result.data.text,
        confidence: result.data.confidence,
      };
    }

    throw new Error();
  } catch (err) {
    console.error('⚠️ OCR Service error:', err);
    throw err;
  }
};
