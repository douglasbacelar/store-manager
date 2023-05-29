const salesMockModel = [
  {
    saleId: 1,
    date: '2023-05-26T22:27:55.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-05-26T22:27:55.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-05-26T22:27:55.000Z',
    productId: 3,
    quantity: 15,
  },
];

const salesMockId = [
  {
    date: '2023-05-27T12:13:53.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-05-27T12:13:53.000Z',
    productId: 2,
    quantity: 10,
  },
];

const newSalesModel = [
  {
    productId: 1,
    quantity: 12,
  },
  {
    productId: 2,
    quantity: 3,
  },
];

module.exports = {
  salesMockModel,
  salesMockId,
  newSalesModel,
};