const invalidRequiredProductSales = (req, res, next) => {
  const data = req.body;

  const requiredProduct = data.every((product) => product.productId !== undefined);

  if (!requiredProduct) return res.status(400).json({ message: '"productId" is required' });

  return next();
};

const invalidRequiredQuantitySales = (req, res, next) => {
  const data = req.body;

  const requiredQuantity = data.every((product) => product.quantity !== undefined);

  if (!requiredQuantity) return res.status(400).json({ message: '"quantity" is required' });

  const quantityValue = data.every((qtde) => qtde.quantity > 0);

  if (!quantityValue) {
    return res.status(422)
       .json({ message: '"quantity" must be greater than or equal to 1' }); 
   } 

  return next();
};

const notFoundQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
 return res.status(422)
 .json({ message: '"quantity" must be greater than or equal to 1' }); 
  }
  if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
  return next();
};

module.exports = {
  invalidRequiredProductSales,
  invalidRequiredQuantitySales,
  notFoundQuantity,
};