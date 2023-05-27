const mockNotFoundProduct = {
  type: 404,
  message: 'Product not found',
  };

const mockFoundAllProduct = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
  {
    id: 4,
    name: 'Novo produto',
  },
];

module.exports = { 
  mockNotFoundProduct,
  mockFoundAllProduct,
};