const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { invalidRequiredProductSales, 
invalidRequiredQuantitySales,
 notFoundQuantity } = require('../../../src/middlewares/invalidSalesData');

const { expect } = chai;

chai.use(sinonChai);

describe('Testando Middleware - invalidRequiredProductSales', function () {
  describe('Body inválidos enviados', function () {
    it('Deve retornar mensagem "productId" is required" e status 400', async function () {
     // AAA
     const res = {};
     const req = { body: [
      {
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ] };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();

     invalidRequiredProductSales(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"productId" is required',
    });
    });

    it(`Deve retornar mensagem quantity must be greater than or equal to 1
     e status 422`, async function () {
      // AAA
      const res = {};
      const req = { body: [
        {
          productId: 2,
          quantity: 0,
        },
        {
          productId: 2,
          quantity: -1,
        },
      ] };
      const next = sinon.stub().returns();
     
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
 
      invalidRequiredQuantitySales(req, res, next);
 
     expect(res.status).to.have.been.calledWith(422);
     expect(res.json).to.have.been.calledWith({
       message: '"quantity" must be greater than or equal to 1',
     });
     });

     it(`Deve retornar mensagem '"quantity" is required'
     e status 400 quando mão for passado quantidade`, async function () {
      // AAA
      const res = {};
      const req = { body: [
        {
          productId: 2,
          quantity: 2,
        },
        {
          productId: 2,
        },
      ] };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const next = sinon.stub().returns();
 
      invalidRequiredQuantitySales(req, res, next);
 
     expect(res.status).to.have.been.calledWith(400);
     expect(res.json).to.have.been.calledWith({
       message: '"quantity" is required',
     });
     });
  });

  describe('Testando Middleware - notFoundQuantity', function () {
    describe('Body inválidos enviados', function () {
      it(`Deve retornar mensagem quantity must be greater than or equal to 1
       e status 422`, async function () {
        // AAA
        const res = {};
        const req = { params: { productId: 1, saleId: 1 },
        body: {
            quantity: 0,
          },
         };
        const next = sinon.stub().returns();
       
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
   
        notFoundQuantity(req, res, next);
   
       expect(res.status).to.have.been.calledWith(422);
       expect(res.json).to.have.been.calledWith({
         message: '"quantity" must be greater than or equal to 1',
       });
       });
  
       it(`Deve retornar mensagem '"quantity" is required'
       e status 400 quando mão for passado quantidade`, async function () {
        // AAA
        const res = {};
        const req = { body: [
          {
            productId: 2,
            quantity: 2,
          },
          {
            productId: 2,
          },
        ] };
        const next = sinon.stub().returns();
       
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
   
        notFoundQuantity(req, res, next);
   
       expect(res.status).to.have.been.calledWith(400);
       expect(res.json).to.have.been.calledWith({
         message: '"quantity" is required',
       });
       });
    });
  
  afterEach(function () {
    sinon.restore();
  });
});
});