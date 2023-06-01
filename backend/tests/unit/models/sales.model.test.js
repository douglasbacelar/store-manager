const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesMockModel, salesMockId, newSalesModel,
   saleAndProcuctMockId, 
   salesUpdatedMockModel } = require('./mocks/sales.model.mock');

describe('Model -> Testes de unidade do model de sales', function () {
  it('GET ID -> Listando todos os produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([salesMockModel]);
    // Act
    const result = await salesModel.getAll();
    // Assert
    expect(result).to.be.deep.equal(salesMockModel);
  });

  it('GET ID -> Recuperando uma venda a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[salesMockId]]);
    // Act
    const result = await salesModel.getId(1);
    // Assert
    expect(result).to.be.deep.equal([salesMockId]);
  });

  it('GET ID BY SALE AND PRODUCT -> Listando todos os produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([saleAndProcuctMockId]);
    // Act
    const result = await salesModel.getBySaleAndProduct(1, 1);
    // Assert
    expect(result).to.be.deep.equal(saleAndProcuctMockId);
  });

  it('GET ID BY SALE AND PRODUCT -> Recuperando uma venda a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[salesMockId]]);
    // Act
    const result = await salesModel.getId(1);
    // Assert
    expect(result).to.be.deep.equal([salesMockId]);
  });

  describe('Model -> Testes endpoint POST', function () {
    it('Cadastrando uma nova venda', async function () {
      // Arrange
    sinon.stub(connection, 'execute').resolves([39]);
    // Act
    const result = await salesModel.salesCriated(39, newSalesModel);
    // Assert
    expect(result).to.equal(39);
    });

    it('Cadastrando uma nova venda - insertId', async function () {
      // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    // Act
    const result = await salesModel.createSalesId();
    // Assert
    expect(result).to.equal(42);
    });
});

describe('Model -> Testes endpoint PUT', function () {
  it('Atualizando uma venda', async function () {
    // Arrange
  sinon.stub(connection, 'execute').resolves(salesUpdatedMockModel);
  // Act
  const result = await salesModel.updateSale(25, 1, 1);
  // Assert
  expect(result.quantity).to.equal(25);
  });
});

  describe('Model -> Testes endpoint DELETE', function () {
    it('Excluindo uma venda', async function () {
      // Arrange
    sinon.stub(connection, 'execute').resolves([1]);
    // Act
    const result = await salesModel.deleteSale(1);
    // Assert
    expect(result).to.equal(1);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});