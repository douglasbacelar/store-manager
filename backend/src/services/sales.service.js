const { salesModel, productModel } = require('../models');

const getAll = async () => {
  const listAll = await salesModel.getAll();
  return { type: null, message: listAll };
};

const getId = async (salesId) => {
  const listId = await salesModel.getId(salesId);
  if (!listId || listId.length === 0) return { type: 404, message: 'Sale not found' };
  return { type: null, message: listId };
};

const salesCriated = async (data) => {
  const idProductPromise = data.map((sale) => productModel.getId(sale.productId));
  const productIdResult = await Promise.all(idProductPromise);
  const undefinedProductId = productIdResult.every((id) => id !== undefined);

  if (!undefinedProductId) return { type: 'product not found', message: 'Product not found' };
  
  const createId = await salesModel.createSalesId();
  const salePromise = data.map((sale) => salesModel.salesCriated(createId, sale));
  const result = await Promise.all(salePromise);
  console.log(result[1]);
  const saleMessage = { type: null, message: { id: createId, itemsSold: result[1] } };

  return saleMessage;
};

module.exports = {
  getAll,
  getId,
  salesCriated,
};