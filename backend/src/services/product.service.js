const { productModel } = require('../models');

const getAll = async () => {
  const listAll = await productModel.getAll();
  return listAll;
};

const getId = async (productId) => {
  const listId = await productModel.getId(productId);
  if (!listId) return { type: 404, message: 'Product not found' };
  return listId;
};

module.exports = {
  getAll,
  getId,
};