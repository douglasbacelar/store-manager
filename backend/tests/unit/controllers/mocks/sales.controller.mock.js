const mockNotFoundSale = {
  type: 404,
  message: 'Sale not found',
  };

const date1 = '2023-05-26T22:27:55.000Z';

const mockFoundAllSales = [
  {
    saleId: 1,
    date: date1,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: date1,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: date1,
    productId: 3,
    quantity: 15,
  },
];

const mockFoundSalesId = [
  {
    date: date1,
    productId: 1,
    quantity: 5,
  },
  {
    date: date1,
    productId: 2,
    quantity: 10,
  },
  {
    date: date1,
    productId: 3,
    quantity: 15,
  },
];

module.exports = { 
  mockNotFoundSale,
  mockFoundAllSales,
  mockFoundSalesId,
};