const {
  difference,
  size
} = require('lodash')


const FinancialHealth = require('../models/financialHealth.model')

class CustomError extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}


const checkRequiredFields = (requiredFields = [], data = {}) => {
  const missingFields = difference(requiredFields, Object.keys(data))
  if (size(missingFields)) {
    throw new CustomError(400, `Missing ${missingFields}`)
  }
}


module.exports.create = async (req, res) => {
  try {
    const { income, expenses, assets, debts } = req.body
    checkRequiredFields(['income', 'expenses', 'assets', 'debts'], req.body)
    const netIncome = income - expenses
    const netWorth = assets - debts
    const financialHealthScore = netIncome + netWorth

    const financialHealthData = {
      income,
      expenses,
      debts,
      assets,
      financialHealthScore,
    }


    const result = await FinancialHealth.create(financialHealthData);
    if (!result) {
      res.json({ message: 'Not Created Financial Health Score.' });
    }

    res.json({ message: 'Successfully Created Financial Health Score.', financialHealthScore })

  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}


