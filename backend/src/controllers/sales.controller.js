const { salesService } = require('../services');

const getAll = async (_req, res) => {
    const { message } = await salesService.getAll();
    return res.status(200).json(message);
};

const getId = async (req, res) => {
    const { salesId } = req.params;
    const listId = await salesService.getId(salesId);
    if (listId.type) {
      return res.status(404).json({ message: listId.message });
    }
    return res.status(200).json(listId.message);
};

module.exports = {
  getAll,
  getId,
};