const express = require('express');
const ocrRoutes = require('./routes/ocr.routes');
const app = express();

app.use(express.json());
app.use('/ocr', ocrRoutes);

module.exports = app;
