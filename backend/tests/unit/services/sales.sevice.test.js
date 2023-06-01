const { expect } = require('chai');
const sinon = require('sinon');

const { salesService } = require('../../../src/services');
const { salesModel, productModel } = require('../../../src/models');
const { correctSaleIdMockService,
salesMockService, newSalesMockService } = require('./mocks/sales.service.mock');

describe('Service -> Verificando service sales', function () {
  describe('listagem de todas as vendas', function () {
    it('Retorna lista completa das vendas', async function () {
      // Arrange
      sinon.stub(salesModel, 'getAll').resolves(salesMockService);
      // Act
      const result = await salesService.getAll();
      // Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(salesMockService);
    });
  });

  describe('listagem de uma venda especifica', function () {
    it('Falhando se o id da venda não existir', async function () {
       // Arrange
      sinon.stub(salesModel, 'getId').resolves(undefined);
      // Act
      const result = await salesService.getId(9999);
      // Assert
      expect(result.type).to.equal(404);
      expect(result.message).to.equal('Sale not found');
    });
  
    it('Retornando o id encontrado com sucesso', async function () {
      // Arrange
      sinon.stub(salesModel, 'getId').resolves(correctSaleIdMockService);
      // Act
      const result = await salesService.getId(2);
      // Assert
      expect(result.message).to.be.deep.equal(correctSaleIdMockService);
    });
  });

  describe('POST - Cadastro de uma venda', function () {
    it('Com informações válidas', async function () {
      // arrange
      sinon.stub(productModel, 'getId').resolves(1);
      sinon.stub(salesModel, 'createSalesId').resolves(4);
      sinon.stub(salesModel, 'salesCriated')
        .resolves(newSalesMockService);
      
      // act
      const result = await salesService
        .salesCriated(newSalesMockService);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ id: 4, itemsSold: newSalesMockService });
    });

    it('Com informações inválidas', async function () {
      // arrange
      sinon.stub(productModel, 'getId').resolves(undefined);
      // sinon.stub(salesModel, 'createSalesId').resolves(4);
      // sinon.stub(salesModel, 'salesCriated')
      //   .resolves(newSalesMockService);
      
      // act
      const result = await salesService
        .salesCriated(newSalesMockService);

      // assert
      expect(result.type).to.equal('product not found');
      expect(result.message).to.deep.equal('Product not found');
    });
  });

  describe('DELETE - Excluindo uma venda', function () {
    it('Com informações válidas', async function () {
      // arrange
      sinon.stub(salesModel, 'getId').resolves([
        {
          date: '2023-05-30T18:43:03.000Z',
          productId: 1,
          quantity: 5,
        },
        {
          date: '2023-05-30T18:43:03.000Z',
          productId: 2,
          quantity: 10,
        },
      ]);
      sinon.stub(salesModel, 'deleteSale').resolves();
      
      // act
      const result = await salesService.deleteSale(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(null);
    });

    it('Com informações não enviadas', async function () {
      // arrange
      sinon.stub(salesModel, 'getId').resolves([]);
      sinon.stub(salesModel, 'deleteSale').resolves();
      
      // act
      const result = await salesService.deleteSale(undefined);

      // assert
      expect(result.type).to.equal(404);
      expect(result.message).to.deep.equal('Sale not found');
    });
  });

  describe('PUT - Atualização de uma venda', function () {
    it('Com informações válidas', async function () {
      // arrange
      sinon.stub(salesModel, 'getId').resolves([
        {
          date: '2023-06-01T12:55:44.000Z',
          productId: 3,
          quantity: 25,
        },
      ]);
      sinon.stub(salesModel, 'updateSale').resolves();
      sinon.stub(salesModel, 'getBySaleAndProduct').resolves([{
        date: '2023-06-01T12:55:44.000Z',
        productId: 3,
        quantity: 25,
      }]);
      
      // act
      const result = await salesService.updateSale(25, 3, 1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({
        date: '2023-06-01T12:55:44.000Z',
        productId: 3,
        quantity: 25,
        saleId: 1,
      });
    });

    it('Com informações inválidas de produto não encontrado', async function () {
      // arrange
      sinon.stub(salesModel, 'getId').resolves([]);
      sinon.stub(salesModel, 'updateSale').resolves();
      
      // act
      const result = await salesService.updateSale(25, 3000, 1);
      // assert
      expect(result.type).to.equal(404);
      expect(result.message).to.deep.equal('Product not found in sale');
    });

    it('Com informações inválidas de venda não encontrada', async function () {
      // arrange
      sinon.stub(salesModel, 'getId').resolves([
        {
          date: '2023-06-01T12:55:44.000Z',
          productId: 3,
          quantity: 25,
        },
      ]);
      sinon.stub(salesModel, 'updateSale').resolves();
      sinon.stub(salesModel, 'getBySaleAndProduct').resolves([undefined]);
      
      // act
      const result = await salesService.updateSale(25, 3, 1000);
      // assert
      expect(result.type).to.equal(404);
      expect(result.message).to.deep.equal('Sale not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});