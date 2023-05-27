const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const chai = require('chai');

chai.use(sinonChai);

const { expect } = chai;

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

const { mockFoundAllSales, mockNotFoundSale,
   mockFoundSalesId } = require('./mocks/sales.controller.mock');

describe('Controller -> Testando Sales Controller', function () {
  describe('Procura a venda com id inexistente e existente', function () {
    it('SalesId inexistente status 404 e mensagem sale not found', async function () {
     // Arrange
      const res = {};
      const req = { params: { salesId: 9999 } };
      sinon.stub(salesService, 'getId').resolves(mockNotFoundSale);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Act

      await salesController.getId(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
    it('saleId existente status 200 e mensagem da venda', async function () {
     // AAA
     // Arrange

     const res = {};
     const req = { params: { productId: 1 } };

     res.status = sinon.stub().returns(res);
     res.json = sinon.stub().returns();

     sinon.stub(salesService, 'getId').resolves({ type: null, message: mockFoundSalesId[0] });

     await salesController.getId(req, res);

     expect(res.status).to.have.been.calledWith(200);
     expect(res.json).to.have.been.calledWith({
      date: '2023-05-26T22:27:55.000Z',
      productId: 1,
      quantity: 5,
    });
    });
  });

  describe('Listagem das vendas', function () {
    it('Lista todas as vendas', async function () {
     // Arrange
      const res = {};
      const req = {};
      sinon.stub(salesService, 'getAll').resolves({ type: null, message: mockFoundAllSales });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Act

      await salesController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockFoundAllSales);
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});