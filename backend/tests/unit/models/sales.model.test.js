const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesMockModel, salesMockId } = require('./mocks/sales.model.mock');

describe('Model -> Testes de unidade do model de sales', function () {
  it('Listando todos os produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([salesMockModel]);
    // Act
    const result = await salesModel.getAll();
    // Assert
    expect(result).to.be.deep.equal(salesMockModel);
  });

  it('Recuperando uma venda a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[salesMockId]]);
    // Act
    const result = await salesModel.getId(1);
    // Assert
    expect(result).to.be.deep.equal([salesMockId]);
  });

  afterEach(function () {
    sinon.restore();
  });
});