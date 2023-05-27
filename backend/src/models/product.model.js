const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );
  return products;
};

const getId = async (id) => {
  const [[productId]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return productId;
};

const createProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (name)
    VALUES (?);`,
    [...Object.values(name)],
  );

  return insertId;
};

module.exports = {
  getAll,
  getId,
  createProduct,
};