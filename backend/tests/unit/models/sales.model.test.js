const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesMockModel, salesMockId, newSalesModel,
   saleAndProcuctMockId } = require('./mocks/sales.model.mock');

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

  afterEach(function () {
    sinon.restore();
  });
});