const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, `${new Date().toISOString()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, callback) => {
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 64 * 1024 * 1024, // 64 MB
    },
    fileFilter: fileFilter,
});

router.post(
    '/',
    checkAuth,
    upload.single('productImage'),
    ProductsController.products_create_product
);

router.get('/', ProductsController.products_get_all);

router.get('/:productId', ProductsController.products_get_product);

router.patch(
    '/:productId',
    checkAuth,
    ProductsController.products_update_product
);

router.delete(
    '/:productId',
    checkAuth,
    ProductsController.products_delete_product
);

module.exports = router;
