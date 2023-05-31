const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');
const { invalidRequiredProductSales,
   invalidRequiredQuantitySales, 
   notFoundQuantity } = require('../middlewares/invalidSalesData');

router.get('/', salesController.getAll);

router.put(
'/:saleId/products/:productId/quantity', 
notFoundQuantity,
salesController.updateSale,
);

router.post(
'/', 
invalidRequiredProductSales,
invalidRequiredQuantitySales,
salesController.salesCriated,
);

router.get('/:salesId', salesController.getId);
router.delete('/:salesId', salesController.deleteSale);

module.exports = router;
