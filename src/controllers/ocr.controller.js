const { performOCR } = require('../services/tesseract.service');
const { cleanupFile } = require('../utils/file.util');
const path = require('path');

exports.processOCR = async (req, res) => {
  const filePath = req.file.path;
  const originalName = req.file.originalname;

  try {
    const result = await performOCR(filePath);
    cleanupFile(filePath);
    res.json({
      contractId: path.parse(originalName).name,
      text: result.text,
      confidence: result.confidence,
    });
  } catch (error) {
    console.error('OCR error:', error);
    cleanupFile(filePath);
    res.status(500).json({ error: 'OCR processing failed' });
  }
};
