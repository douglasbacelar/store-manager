const { productService } = require('../services');

const getAll = async (_req, res) => {
    const { message } = await productService.getAll();
    return res.status(200).json(message);
};

const getId = async (req, res) => {
    const { productId } = req.params;
    const listId = await productService.getId(productId);
    if (listId.type) {
      return res.status(404).json({ message: listId.message });
    }
    return res.status(200).json(listId.message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const productCreated = await productService.createProduct(name);
  return res.status(201).json(productCreated.message);
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name } = req.body;
  const listId = await productService.updateProduct(productId, name);
  if (listId.type) {
    return res.status(404).json({ message: listId.message });
  }
  return res.status(200).json(listId.message);
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const deleteId = await productService.deleteProduct(productId);
  if (deleteId.type) {
    return res.status(404).json({ message: deleteId.message });
  }
  return res.status(204).json();
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const infoProduct = await productService.searchProduct(q);
  return res.status(200).json(infoProduct.message);
};

module.exports = {
  getAll,
  getId,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};