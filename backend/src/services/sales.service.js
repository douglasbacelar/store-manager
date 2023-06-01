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
  const saleMessage = { type: null, message: { id: createId, itemsSold: result[1] } };

  return saleMessage;
};

const deleteSale = async (salesId) => {
  const searchSale = await salesModel.getId(salesId);

  if (searchSale.length === 0) return { type: 404, message: 'Sale not found' };
  await salesModel.deleteSale(salesId);
  return { type: null, message: null };
};

const updateSale = async (quantity, productId, saleId) => {
  const searchProductId = await salesModel.getId(productId);
  console.log(searchProductId);
  if (searchProductId.length === 0) return { type: 404, message: 'Product not found in sale' };
  
  await salesModel.updateSale(quantity, productId, saleId);

  const [searchSale] = await salesModel.getBySaleAndProduct(saleId, productId);
  console.log(searchSale, 'oii');
  if (!searchSale) return { type: 404, message: 'Sale not found' };
  searchSale.saleId = +saleId;
  
  return { type: null, message: searchSale };
};

module.exports = {
  getAll,
  getId,
  salesCriated,
  deleteSale,
  updateSale,
};