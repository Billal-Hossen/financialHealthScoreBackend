module.exports.validateInput = (req, res, next) => {
  const { income, expenses, debts, assets } = req.body;

  function isValidNumber(value) {
    return typeof value === 'number' && !isNaN(value) && value >= 0;
  }

  if (!isValidNumber(income) || !isValidNumber(expenses) || !isValidNumber(debts) || !isValidNumber(assets)) {
    return res.status(400).json({ error: 'Invalid input values. All fields must be numbers with values >= 0.' });
  }

  next();
}