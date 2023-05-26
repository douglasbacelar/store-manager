const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );
  console.log(products);
  return products;
};

const getId = async (id) => {
  const [[productId]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return productId;
};

module.exports = {
  getAll,
  getId,
};