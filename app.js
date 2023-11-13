const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = express.Router()
const connectDB = require('./db/connectDB')
const { create } = require('./controllers/financialHealth.controller')
const { validateInput } = require('./helper/inputValidate')


//app
const app = express()

//Database connection
connectDB()

// MiddleWare
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

// Calculate score router
router.post('/calculate', validateInput, create)

// Testing 
router.get('/check', (req, res) => {
  res.send('Route is working! YaY!')
})
app.use(router);


module.exports = app