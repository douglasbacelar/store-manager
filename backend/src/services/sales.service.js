const { salesModel } = require('../models');

const getAll = async () => {
  const listAll = await salesModel.getAll();
  return { type: null, message: listAll };
};

const getId = async (salesId) => {
  const listId = await salesModel.getId(salesId);
  console.log(listId, 'listid');
  if (!listId || listId.length === 0) return { type: 404, message: 'Sale not found' };
  return { type: null, message: listId };
};

module.exports = {
  getAll,
  getId,
};