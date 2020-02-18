const express = require('express');
const router = express.Router();
const moment = require('moment')
const axios = require('axios')

const api_URL = `http://www.apilayer.net/api/live?access_key=${process.env.CURRENCY_LAYER_EXCHANGE_API_KEY}`
let currency_exchange = {}

var updateCurrencyExchange = function(){
    axios({
        method: 'get',
        url: api_URL})
        .then((result) => {
          currency_exchange.status = result.status
          currency_exchange.statusText = result.statusText
          currency_exchange.data = result.data
        }).catch((err) => {
          currency_exchange.data = err
          console.log(err)
        });
}

// initial call
updateCurrencyExchange()
// free api has calls limit hence: it is updated once a day only
setInterval(updateCurrencyExchange, 24 * 3600 * 1000);


router.get('/', (req, res) => {
  if (req.query.to) {
    let queryParam = `USD${req.query.to.toUpperCase()}`
    if (!currency_exchange.data.quotes[queryParam]) {
      res.send({
        status: 204,
        statusText: 'No Content',
        note: 'API is called once per day only',
        date: moment().format(),
        params: {
          ...req.query,
          ...res.params
        },
        sourceAPI: 'http://apilayer.net/api/live',
        response: 'DNE'
      })
    } else {
      res.send({
        status: currency_exchange.status,
        statusText: currency_exchange.statusText,
        note: 'API is called once per day only',
        date: moment().format(),
        params: {
          ...req.query,
          ...res.params
        },
        sourceAPI: 'http://apilayer.net/api/live',
        response: currency_exchange.data.quotes[queryParam]
      })
    }
  } else {
    res.send({
      status: currency_exchange.status,
      statusText: currency_exchange.statusText,
      note: 'API is called once per day only',
      date: moment().format(),
      params: {
        ...req.query,
        ...res.params
      },
      sourceAPI: 'http://apilayer.net/api/live',
      response: currency_exchange.data.quotes
    })
  }
})


module.exports = router;