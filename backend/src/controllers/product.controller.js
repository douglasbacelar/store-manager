const { productService } = require('../services');

const getAll = async (_req, res) => {
  try {
    const allProducts = await productService.getAll();
    return res.status(200).json(allProducts);
  } catch (e) {
    return res.status(404).send(e);
  }
};

const getId = async (req, res) => {
    const { productId } = req.params;
    const listId = await productService.getId(productId);
    if (listId.type) {
      return res.status(404).json({ message: listId.message });
    }
    return res.status(200).json(listId);
};

module.exports = {
  getAll,
  getId,
};