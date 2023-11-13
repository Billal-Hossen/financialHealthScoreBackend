const { model, Schema } = require('mongoose')


const financialHealthSchema = new Schema({
  income: {
    type: Number,
    required: true,
    min: [0, 'Income must be a non-negative number']
  },

  expenses: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (value) {
        return value <= this.income;
      },
      message: 'Expenses should not exceed income',
    },
  },

  debts: {
    type: Number,
    required: true,
    min: [0, 'Debts must be a non-negative number'],
  },

  assets: {
    type: Number,
    required: true,
    min: [0, 'Assets must be a non-negative number']
  },

  financialHealthScore: {
    type: Number,
    required: true,
    min: 0,
  },
})

const FinancialHealth = model('FinancialHealth', financialHealthSchema)

module.exports = FinancialHealth