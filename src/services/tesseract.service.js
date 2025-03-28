const Tesseract = require('tesseract.js');

exports.performOCR = async (filePath) => {
  const result = await Tesseract.recognize(filePath, 'eng', {
    logger: m => console.log(m)
  });

  return {
    text: result.data.text,
    confidence: result.data.confidence,
  };
};
