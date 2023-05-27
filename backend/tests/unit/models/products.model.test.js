const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { productsMockModel } = require('./mocks/products.model.mock');

describe('Model -> Testes de unidade do model de produtos', function () {
  it('Listando todos os produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([productsMockModel]);
    // Act
    const result = await productModel.getAll();
    // Assert
    expect(result).to.be.deep.equal(productsMockModel);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[productsMockModel[1]]]);
    // Act
    const result = await productModel.getId(2);
    // Assert
    expect(result).to.be.deep.equal(productsMockModel[1]);
  });

  afterEach(function () {
    sinon.restore();
  });
});