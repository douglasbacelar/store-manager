const { expect } = require('chai');
const sinon = require('sinon');

const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { correctSaleIdMockService,
salesMockService } = require('./mocks/sales.service.mock');

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

  afterEach(function () {
    sinon.restore();
  });
});