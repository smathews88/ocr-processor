const express = require('express');
const router = express.Router();
const upload = require('../utils/file.util').upload;
const ocrController = require('../controllers/ocr.controller');

router.post('/', upload.single('file'), ocrController.processOCR);

module.exports = router;
