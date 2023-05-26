const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT t1.sale_id, t2.date, t1.product_id, t1.quantity
    FROM StoreManager.sales_products AS t1
    INNER JOIN StoreManager.sales AS t2
    ON t1.sale_id = t2.id
    ORDER BY t1.sale_id, product_id;`,
  );
  return sales;
};

const getId = async (id) => {
  const [[salesId]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return salesId;
};

module.exports = {
  getAll,
  getId,
};