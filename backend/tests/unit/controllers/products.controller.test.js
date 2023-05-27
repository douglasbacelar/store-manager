const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const chai = require('chai');

chai.use(sinonChai);

const { expect } = chai;

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');

const { mockNotFoundProduct, mockFoundAllProduct } = require('./mocks/products.controller.mock');

describe('Controller -> Testando Products Controller', function () {
  describe('Procura de produto com id inexistente e existente', function () {
    it('ProductId inexistente status 404 e mensagem product not found', async function () {
     // Arrange
      const res = {};
      const req = { params: { productId: 9999 } };
      sinon.stub(productService, 'getId').resolves(mockNotFoundProduct);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Act

      await productController.getId(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
    it('productId existente status 200 e mensagem do produto', async function () {
     // AAA
     // Arrange

     const res = {};
     const req = { params: { productId: 1 } };

     res.status = sinon.stub().returns(res);
     res.json = sinon.stub().returns();

     sinon.stub(productService, 'getId').resolves({ type: null, message: mockFoundAllProduct[0] });

     await productController.getId(req, res);

     expect(res.status).to.have.been.calledWith(200);
     expect(res.json).to.have.been.calledWith({ id: 1, name: 'Martelo de Thor' });
    });
  });

  describe('Listagem dos produtos', function () {
    it('Lista todos os produtos', async function () {
     // Arrange
      const res = {};
      const req = {};
      sinon.stub(productService, 'getAll').resolves({ type: null, message: mockFoundAllProduct });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Act

      await productController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockFoundAllProduct);
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});