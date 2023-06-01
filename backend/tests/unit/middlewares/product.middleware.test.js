const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { invalidProductName, 
  invalidUpdateIdProductName } = require('../../../src/middlewares/invalidProductName');

const { expect } = chai;

chai.use(sinonChai);

describe('Testando Middleware - InvalidProductName', function () {
  describe('Body enviados', function () {
    it('Com informações válidas, next funcionando', async function () {
     // AAA
     const req = { body: { name: 'produtoX' } };
     const res = {};
     const next = sinon.stub().returns();
    
     // res.status = sinon.stub().returns(res);
     // res.json = sinon.stub().returns();

     invalidProductName(req, res, next);

    expect(next).to.have.been.calledWith();
    });
    it('Inválidos: Deve retornar mensagem "name is required" e status 400', async function () {
     // AAA
     const res = {};
     const req = { body: { name: undefined } };
     const next = sinon.stub().returns();
    
     res.status = sinon.stub().returns(res);
     res.json = sinon.stub().returns();

    invalidProductName(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"name" is required',
    });
    });

    it(`Inválidos: Deve retornar mensagem name length must be at least 5 characters long
     e status 422`, async function () {
      // AAA
      const res = {};
      const req = { body: { name: 'oi' } };
      const next = sinon.stub().returns();
     
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
 
      invalidProductName(req, res, next);
 
     expect(res.status).to.have.been.calledWith(422);
     expect(res.json).to.have.been.calledWith({
       message: '"name" length must be at least 5 characters long',
     });
     });

     it(`Deve retornar mensagem product not found
     e status 404 quando for atualizar o não existir o id procurado`, async function () {
      // AAA
      const res = {};
      const req = { params: { id: 9999 }, body: { name: 'produtoX' } };
      const next = sinon.stub().returns();
     
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
 
      invalidUpdateIdProductName(req, res, next);
 
     expect(res.status).to.have.been.calledWith(404);
     expect(res.json).to.have.been.calledWith({
       message: 'Product not found',
     });
     });
  });
  
  describe('Testando Middleware - invalidUpdateIdProductName', function () {
    describe('Body enviados', function () {
      it('Com informações válidas, next funcionando', async function () {
     // AAA
     const req = { params: { productId: 1 } };
     const res = {};
     const next = sinon.stub().returns();
    
     // res.status = sinon.stub().returns(res);
     // res.json = sinon.stub().returns();

     invalidUpdateIdProductName(req, res, next);

    expect(next).to.have.been.calledWith();
    });
       it(`Deve retornar mensagem product not found
       e status 404 quando for atualizar o não existir o id procurado`, async function () {
        // AAA
        const res = {};
        const req = { params: { id: 9999 }, body: { name: 'teste' } };
        const next = sinon.stub().returns();
       
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
   
        invalidUpdateIdProductName(req, res, next);
   
       expect(res.status).to.have.been.calledWith(404);
       expect(res.json).to.have.been.calledWith({
         message: 'Product not found',
       });
       });
     });
    });
  afterEach(function () {
    sinon.restore();
  });
});
