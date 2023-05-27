const { expect } = require('chai');
const sinon = require('sinon');

const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { correctProductIdMockService,
   productsMockService } = require('./mocks/products.service.mock');

describe('Service -> Verificando service products', function () {
  describe('listagem de todos os produtos', function () {
    it('Retorna lista completa dos produtos', async function () {
      // Arrange
      sinon.stub(productModel, 'getAll').resolves(productsMockService);
      // Act
      const result = await productService.getAll();
      // Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(productsMockService);
    });
  });

  describe('listagem de produto especifico', function () {
    it('Falhando se o id do produto não existe', async function () {
       // Arrange
      sinon.stub(productModel, 'getId').resolves(undefined);
      // Act
      const result = await productService.getId(9999);
      // Assert
      expect(result.type).to.equal(404);
      expect(result.message).to.equal('Product not found');
    });
  
    it('Retornando o id encontrado com sucesso', async function () {
      // Arrange
      sinon.stub(productModel, 'getId').resolves(correctProductIdMockService);
      // Act
      const result = await productService.getId(2);
      // Assert
      expect(result.message).to.be.deep.equal(correctProductIdMockService);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});