const { productModel } = require('../models');

const getAll = async () => {
  const listAll = await productModel.getAll();
  return { type: null, message: listAll };
};

const getId = async (productId) => {
  const listId = await productModel.getId(productId);
  if (!listId) return { type: 404, message: 'Product not found' };
  return { type: null, message: listId };
};

const createProduct = async (name) => {
  if (!name) return { type: 404, message: 'Input your product' };
  const newProductId = await productModel.createProduct({ name });
  const newProduct = await productModel.getId(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (id, name) => {
  await productModel.updateProduct(id, name);
  const searchProduct = await productModel.getId(id);
  if (!searchProduct) return { type: 404, message: 'Product not found' };
  return { type: null, message: searchProduct };
};

const deleteProduct = async (id) => {
  const searchProduct = await productModel.getId(id);
  if (!searchProduct) return { type: 404, message: 'Product not found' };
  await productModel.deleteProduct(id);
  return { type: null, message: null };
};

module.exports = {
  getAll,
  getId,
  createProduct,
  updateProduct,
  deleteProduct,
};