const { expect } = require('chai');
const sinon = require('sinon');

const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { correctProductIdMockService,
   productsMockService, 
   newProductService } = require('./mocks/products.service.mock');

describe('Service -> Verificando service products', function () {
  describe('GET - listagem de todos os produtos', function () {
    it('Retorna lista completa dos produtos', async function () {
      // Arrange
      sinon.stub(productModel, 'getAll').resolves(productsMockService);
      // Act
      const result = await productService.getAll();
      // Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(productsMockService);
    });

    it('Retorna lista dos produtos com filtro selecionado', async function () {
      // Arrange
      sinon.stub(productModel, 'searchProduct').resolves(productsMockService[0]);
      // Act
      const result = await productService.searchProduct('M');
      // Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(productsMockService[0]);
    });
  });

  describe('GET- listagem de produto especifico', function () {
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

  describe('POST - Cadastro de um produto', function () {
    it('Com informações válidas', async function () {
      // arrange
      sinon.stub(productModel, 'createProduct').resolves(4);
      sinon.stub(productModel, 'getId').resolves(productsMockService[3]);
      
      // act
      const result = await productService.createProduct(newProductService.name);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productsMockService[3]);
    });
  });

  describe('PUT - Atualização de um produto', function () {
    it('Com informações válidas', async function () {
      // arrange
      sinon.stub(productModel, 'updateProduct').resolves();
      sinon.stub(productModel, 'getId').resolves({
        id: 3,
        name: 'ProdutoX',
      });
      
      // act
      const result = await productService.updateProduct(3, 'ProdutoX');
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({
        id: 3,
        name: 'ProdutoX',
      });
    });

    it('Com informações inválidas', async function () {
      // arrange
      sinon.stub(productModel, 'updateProduct').resolves();
      sinon.stub(productModel, 'getId').resolves(undefined);
      
      // act
      const result = await productService.updateProduct(75, 'ProdutoX');

      // assert
      expect(result.type).to.equal(404);
      expect(result.message).to.deep.equal('Product not found');
    });
  });

  describe('DELETE - Excluindo um produto', function () {
    it('Com informações válidas', async function () {
      // arrange
      sinon.stub(productModel, 'getId').resolves({ id: 2, name: 'Martelo de Thor' });
      sinon.stub(productModel, 'deleteProduct').resolves();
      
      // act
      const result = await productService.deleteProduct(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(null);
    });

    it('Com informações não enviadas', async function () {
      // arrange
      sinon.stub(productModel, 'getId').resolves(undefined);
      sinon.stub(productModel, 'deleteProduct').resolves();
      
      // act
      const result = await productService.deleteProduct(undefined);

      // assert
      expect(result.type).to.equal(404);
      expect(result.message).to.deep.equal('Product not found');
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});