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

module.exports = {
  getAll,
  getId,
};