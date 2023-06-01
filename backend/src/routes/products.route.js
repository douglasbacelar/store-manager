const express = require('express');

const router = express.Router();

const { productController } = require('../controllers');
const { invalidProductName,
   invalidUpdateIdProductName } = require('../middlewares/invalidProductName');

router.get('/', productController.getAll);
router.get('/search', productController.searchProduct);
router.post('/', invalidProductName, productController.createProduct);
router.get('/:productId', productController.getId);
router.put(
'/:productId', 
invalidUpdateIdProductName,
invalidProductName, 
productController.updateProduct,
);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;