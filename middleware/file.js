const multer = require(`multer`);
const upload = multer({ dest: `upload-folder/` });

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, `upload-folder`);
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

module.exports = multer({ storage });
