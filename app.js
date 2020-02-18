const express = require('express')
const path = require('path')

const app = express()
require('dotenv').config()

const phyoRoute = require('./routes/phyo.js')
const michaelRoute = require('./routes/michael.js')
const exchangeRoute = require('./routes/exchange.js')

const port = process.env.PORT_NUMBER || 80

// app.use(express.static('./public'))
app.use(express.static(path.join(__dirname, 'client/build')))

// app.use(express.json())

app.use((req, res, next) => {
  if (req.originalUrl !== '/favicon.ico') {
    console.log(`Original_URL: "${req.originalUrl}" and from IP: "${req.ip}"`)
  }
  next()
})

app.get('/api', (req, res) => {
  res.send('Hello From Express!')
})

app.get('/api/phyo', phyoRoute)
app.use('/api/michael', michaelRoute)
app.use('/api/exchange', exchangeRoute)

// app.get('*', (req, res) => {
//   res.send('404 Page not Found!')
// })

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
