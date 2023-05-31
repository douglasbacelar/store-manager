const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT t1.sale_id AS saleId, t2.date, t1.product_id AS productId, t1.quantity
    FROM StoreManager.sales_products AS t1
    INNER JOIN StoreManager.sales AS t2
    ON t1.sale_id = t2.id
    ORDER BY t1.sale_id, product_id;`,
  );
  return sales;
};

const getId = async (id) => {
  const [salesId] = await connection.execute(
    `SELECT t2.date, t1.product_id AS productId, t1.quantity
    FROM StoreManager.sales_products AS t1
    INNER JOIN StoreManager.sales AS t2
    ON t1.sale_id = t2.id
    WHERE sale_id = ?;`,
    [id],
  );
  return salesId;
};

const getBySaleAndProduct = async (id, productId) => {
  const [salesId] = await connection.execute(
    `SELECT t2.date, t1.product_id AS productId, t1.quantity
    FROM StoreManager.sales_products AS t1
    INNER JOIN StoreManager.sales AS t2
    ON t1.sale_id = t2.id
    WHERE sale_id = ? AND product_id = ?;`,
    [id, productId],
  );
  return salesId;
};

const createSalesId = async () => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales (date)
    VALUES (DEFAULT);`,
  );
  return insertId;
};

const salesCriated = async (createId, sale) => {
  await connection.execute(
    `INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) VALUES(?, ?, ?);`,
    [createId, sale.productId, sale.quantity],
  );
  
  const [result] = await connection.execute(
    `SELECT product_id AS productId, quantity
    FROM sales_products WHERE sale_id = ?`,
    [createId],
  );
  return result;
};

const deleteSale = async (id) => {
  const [saleId] = await connection.execute(
    `DELETE FROM StoreManager.sales
    WHERE id = ?;`,
    [id],
  );

  return saleId;
};

const updateSale = async (quantity, productId, saleId) => {
  const [quantityUpdated] = await connection.execute(
    `UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE product_id = ? AND sale_id = ?;`,
    [quantity, productId, saleId],
  );

  console.log([quantity, productId, saleId]);
  return quantityUpdated;
};

module.exports = {
  getAll,
  getId,
  createSalesId,
  salesCriated,
  deleteSale,
  updateSale,
  getBySaleAndProduct,
};