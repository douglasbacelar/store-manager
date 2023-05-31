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
          message: { id: 4,
          itemsSold: [
                  {
                    productId: 1,
                    quantity: 1,
                  },
                  {
                    productId: 2,
                    quantity: 5,
                  },
                ] } });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Act

      await salesController.salesCriated(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: 4,
        itemsSold: [
                {
                  productId: 1,
                  quantity: 1,
                },
                {
                  productId: 2,
                  quantity: 5,
                },
              ] });
    });
  });

  describe('Model -> Testes endpoint PUT', function () {
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
        message: {
          date: '2023-05-31T13:27:10.000Z',
          productId: 1,
          quantity: 5,
          saleId: 1,
        } });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Act

      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        date: '2023-05-31T13:27:10.000Z',
        productId: 1,
        quantity: 5,
        saleId: 1,
      });
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
  });
  
  afterEach(function () {
    sinon.restore();
  });
});