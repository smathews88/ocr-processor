const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

const cleanupFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error('File cleanup error:', err);
  });
};

module.exports = { upload, cleanupFile };
