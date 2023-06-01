const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');

chai.use(sinonChai);
const { expect } = chai;

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { mockFoundAllSales, mockNotFoundSale,
   mockFoundSalesId, 
   saleCriatedSold, 
   messageUpdate } = require('./mocks/sales.controller.mock');

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
     expect(res.json).to.have.been.calledWith(mockFoundSalesId[0]);
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

  describe('Model -> Testes endpoint POST', function () {
    it('Cria uma venda', async function () {
     // Arrange
      const res = {};
      const req = { body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ] };
      sinon.stub(salesService, 'salesCriated')
      .resolves({ type: null,
          message: saleCriatedSold });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Act

      await salesController.salesCriated(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleCriatedSold);
    });

     it('Cria uma venda invalida', async function () {
     // Arrange
      const res = {};
      const req = { body: [
        {
          quantity: 1,
        },
        {
          quantity: 5,
        },
      ] };
      sinon.stub(salesService, 'salesCriated')
      .resolves({ type: 'product not found',
         message: 'Product not found' });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Act

      await salesController.salesCriated(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Controller -> Testes endpoint PUT', function () {
    it('Atualiza uma venda', async function () {
     // Arrange
      const res = {};
      const req = { params: { productId: 1, saleId: 1 },
        body: {
          quantity: 2,
        },
 };
      sinon.stub(salesService, 'updateSale')
      .resolves({ type: null,
        message: messageUpdate });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Act

      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(messageUpdate);
    });

        it('Atualiza uma venda com informações inválidas', async function () {
     // Arrange
      const res = {};
      const req = { params: { productId: 900, saleId: 1 },
        body: {
          quantity: 2,
        },
      };
      sinon.stub(salesService, 'updateSale')
      .resolves({ type: 404,
        message: 'Product not found in sale' });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Act

      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found in sale' });
    });
  });

  describe('Model -> Testes endpoint DELETE', function () {
    it('Apaga uma venda', async function () {
     // Arrange
      const res = {};
      const req = { params: { saleId: 1 } };
      sinon.stub(salesService, 'deleteSale')
      .resolves({ type: null, message: null });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Act

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

        it('Apaga uma venda, com informações invalidas', async function () {
     // Arrange
      const res = {};
      const req = { params: { saleId: 900 } };
      sinon.stub(salesService, 'deleteSale')
      .resolves({ type: 404, message: 'Sale not found' });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Act

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});