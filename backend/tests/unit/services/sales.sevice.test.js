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

    // it('Com informações não enviadas', async function () {
    //   // arrange
    //   sinon.stub(productModel, 'createProduct').resolves(undefined);
    //   // sinon.stub(productModel, 'getId').resolves(undefined);
      
    //   // act
    //   const result = await productService.createProduct(undefined);

    //   // assert
    //   expect(result.type).to.equal(404);
    //   expect(result.message).to.deep.equal('Input your product');
    // });
  });

  afterEach(function () {
    sinon.restore();
  });
});