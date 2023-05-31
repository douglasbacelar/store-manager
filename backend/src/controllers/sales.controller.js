const { salesService } = require('../services');

const getAll = async (_req, res) => {
    const { message } = await salesService.getAll();
    return res.status(200).json(message);
};

const getId = async (req, res) => {
    const { salesId } = req.params;
    const listId = await salesService.getId(salesId);
    if (listId.type) {
      console.log(listId);
      return res.status(404).json({ message: listId.message });
    }
    console.log(listId, 'outro');
    return res.status(200).json(listId.message);
};

const salesCriated = async (req, res) => {
  const data = req.body;
  const result = await salesService.salesCriated(data);
  if (result.type) {
    return res.status(404).json({ message: result.message });
  }
  return res.status(201).json(result.message);
};

const deleteSale = async (req, res) => {
  const { salesId } = req.params;
  const deleteSaleId = await salesService.deleteSale(salesId);

  if (deleteSaleId.type) {
    return res.status(404).json({ message: deleteSaleId.message });
  }
  return res.status(204).json();
};

const updateSale = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const saleUpdated = await salesService.updateSale(quantity, productId, saleId);
  if (saleUpdated.type) {
    return res.status(404).json({ message: saleUpdated.message });
  }
  return res.status(200).json(saleUpdated.message);
};

module.exports = {
  getAll,
  getId,
  salesCriated,
  deleteSale,
  updateSale,
};