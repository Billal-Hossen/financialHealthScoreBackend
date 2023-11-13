const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const FinancialHealth = require('../models/financialHealth.model')



chai.use(chaiHttp)
const { expect } = chai

describe('FinancialHealth Route', () => {
  describe('POST /calculate', () => {
    it('should calculate financial health with valid input', async () => {
      const financialHealthData = {
        income: 5000,
        expenses: 2000,
        assets: 30000,
        debts: 10000
      };

      const res = await chai
        .request(app)
        .post('/calculate')
        .send(financialHealthData)

      expect(res).to.have.status(200)
      expect(res.body).to.have.property('message').equal('Successfully Created Financial Health Score.')
      expect(res.body).to.have.property('financialHealthScore')
    });

    it('should handle missing required fields', async () => {
      const financialHealthData = {
        income: 5000,
        expenses: 2000
      }

      const res = await chai
        .request(app)
        .post('/calculate')
        .send(financialHealthData)

      expect(res).to.have.status(400)
      expect(res.body).to.have.property('error').equal('Missing assets,debts')
    });

    it('should handle invalid input values', async () => {
      const financialHealthData = {
        income: 'invalid',
        expenses: 2000,
        assets: 30000,
        debts: 10000
      }

      const res = await chai
        .request(app)
        .post('/calculate')
        .send(financialHealthData)

      expect(res).to.have.status(400)
      expect(res.body).to.have.property('error').equal('Invalid input values. All fields must be numbers with values >= 0.')
    });

    it('should handle internal server error', async () => {
      sinon.stub(FinancialHealth, 'create').throws(new Error('Test error'))

      const financialHealthData = {
        income: 5000,
        expenses: 2000,
        assets: 30000,
        debts: 10000
      };

      const res = await chai
        .request(app)
        .post('/calculate')
        .send(financialHealthData)

      expect(res).to.have.status(500)
      expect(res.body).to.have.property('error').equal('Internal Server Error')

      await FinancialHealth.create.restore()
    });
  });
});
