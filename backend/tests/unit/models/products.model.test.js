const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { productsMockModel, newProductModel, 
  refreshProduct } = require('./mocks/products.model.mock');

describe('Model -> Testes de unidade do model de produtos', function () {
  describe('Model -> Testes endpoint GET', function () {
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
});

  describe('Model -> Testes endpoint POST', function () {
    it('Cadastrando um novo produto', async function () {
      // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    // Act
    const result = await productModel.createProduct(newProductModel);
    // Assert
    expect(result).to.equal(42);
    });
});

  describe('Model -> Testes endpoint PUT', function () {
    it('Atualizando um produto', async function () {
      // Arrange
    sinon.stub(connection, 'execute').resolves([{ id: 1 }]);
    // Act
    const result = await productModel.updateProduct(refreshProduct);
    // Assert
    expect(result.id).to.equal(1);
    });
  });

    describe('Model -> Testes endpoint DELETE', function () {
    it('Excluindo um produto', async function () {
      // Arrange
    sinon.stub(connection, 'execute').resolves([1]);
    // Act
    const result = await productModel.deleteProduct(1);
    // Assert
    expect(result).to.equal(1);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});