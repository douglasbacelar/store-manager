const correctSaleIdMockService = {
  date: '2023-05-26T22:27:55.000Z',
  productId: 2,
  quantity: 10,
};

const salesMockService = [
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

const newSalesMockService = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 1,
    quantity: 5,
  },
];

module.exports = {
  correctSaleIdMockService,
  salesMockService,
  newSalesMockService,
};