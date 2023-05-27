const express = require('express');

const router = express.Router();

const { productController } = require('../controllers');
const { invalidProductName } = require('../middlewares/invalidProductName');

router.get('/', productController.getAll);
router.post('/', invalidProductName, productController.createProduct);
router.get('/:productId', productController.getId);

module.exports = router;