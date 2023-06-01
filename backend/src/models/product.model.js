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

const updateProduct = async (id, name) => {
  const [productId] = await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?;`,
    [name, id],
  );

  return productId;
};

const deleteProduct = async (id) => {
  const [productId] = await connection.execute(
    `DELETE FROM StoreManager.products
    WHERE id = ?;`,
    [id],
  );
  console.log(productId, 'teste');

  return productId;
};

// /search?q=ar

const searchProduct = async (q) => {
  const takeAllProducts = await getAll();
  const filterNameProducts = takeAllProducts.filter((element) => element.name.includes(q));

  return filterNameProducts;
};

module.exports = {
  getAll,
  getId,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};