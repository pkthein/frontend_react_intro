const express = require('express');
const router = express.Router();
const moment = require('moment')
const axios = require('axios')

const api_URL = `http://api.openweathermap.org/data/2.5/forecast?id=5391997&APPID=${process.env.OPEN_WEATHER_API_KEY} `
let weather_sf = {}

var updateWeather = function(){
    axios({
        method: 'get',
        url: api_URL})
        .then((result) => {
            weather_sf.status = result.status
            weather_sf.statusText = result.statusText
            weather_sf.data = result.data
        }).catch((err) => {
            weather_sf.data = err
            console.log(err)
        });
}

// initial call
updateWeather()
// update once every 11 mins ! api recommends limit is every 10 mins
setInterval(updateWeather, 660 * 1000);


router.get('/', (req, res) => {
  if (req.query.date) {
    let reponseObj = weather_sf.data.list.filter(
      v => v.dt_txt.includes(req.query.date)
    )
    if (reponseObj.length > 0) {
      res.send({
        status: weather_sf.status,
        statusText: weather_sf.statusText,
        date: moment().format(),
        params: {
          ...req.query,
          ...res.params
        },
        sourceAPI: 'http://api.openweathermap.org/data/2.5/forecast?id=5391997&APPID{KEY}',
        response: reponseObj
      })
    } else {
      res.send({
        status: 204,
        statusText: 'No Content',
        date: moment().format(),
        params: {
          ...req.query,
          ...res.params
        },
        sourceAPI: 'http://api.openweathermap.org/data/2.5/forecast?id=5391997&APPID{KEY}',
        response: 'DNE'
      })
    }
  } else {
    res.send({
      status: weather_sf.status,
      statusText: weather_sf.statusText,
      date: moment().format(),
      params: {
        ...req.query,
        ...res.params
      },
      sourceAPI: 'http://api.openweathermap.org/data/2.5/forecast?id=5391997&APPID{KEY}',
      response: weather_sf.data.list
    })
  }
})

module.exports = router;
