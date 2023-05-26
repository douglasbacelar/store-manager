const { salesModel } = require('../models');

const getAll = async () => {
  const listAll = await salesModel.getAll();
  return { type: null, message: listAll };
};

const getId = async (salesId) => {
  const listId = await salesModel.getId(salesId);
  if (!listId) return { type: 404, message: 'Product not found' };
  return { type: null, message: listId };
};

module.exports = {
  getAll,
  getId,
};