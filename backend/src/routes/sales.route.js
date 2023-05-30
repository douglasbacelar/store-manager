const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');
const { invalidRequiredProductSales,
   invalidRequiredQuantitySales } = require('../middlewares/invalidSalesData');

router.get('/', salesController.getAll);
router.post(
'/', 
invalidRequiredProductSales,
invalidRequiredQuantitySales,
salesController.salesCriated,
);
router.get('/:salesId', salesController.getId);
router.delete('/:salesId', salesController.deleteSale);

module.exports = router;

// router.post('/', invalidProductName, productController.createProduct);