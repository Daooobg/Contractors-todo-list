const router = require('express').Router();
const Multer = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

const imageController = require('../controllers/imageController');

router.route('/addAllImages/:id').post(multer.single('image'), imageController.addAllImages);

module.exports = router;
