const express = require('express')
const app = express()
app.use(express.json())

const axios = require('axios')

const myLogic = async (req, res, next) => {
  let respondObj = {
    status: '',
    statusText: '',
    date: new Date(Date.now()).toISOString(),
    params: {
      ...req.query,
      ...res.params
    },
    response: '',
  }
  try {
    let data = await new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: 'https://www.reddit.com/subreddits.json'
      })
        .then(result => {
          if (req.query.subreddit) {
            respondObj.status = result.status
            respondObj.statusText = result.statusText
            respondObj.response = result.data.data.children.filter(
              v => v.data.display_name.toLowerCase().includes(`${req.query.subreddit.toLowerCase()}`)
            )

            let tmpResponse = []

            respondObj.response.forEach(el => {
              if (!tmpResponse.includes(el.data.display_name_prefixed)) {
                tmpResponse.push(el.data.display_name_prefixed)
              }
            })

            if (tmpResponse.length > 0) {
              respondObj.response = tmpResponse
            } else {
              respondObj.status = 204
              respondObj.statusText = 'No Content'
              respondObj.response = 'DNE'
            }

            resolve(respondObj)
          } else {
            respondObj.status = result.status
            respondObj.statusText = result.statusText

            let tmpResponse = []

            result.data.data.children.forEach(el => {
              if (!tmpResponse.includes(el.data.display_name_prefixed)) {
                tmpResponse.push(el.data.display_name_prefixed)
              }
            })

            respondObj.response = tmpResponse

            resolve(respondObj)
          }
        })
        .catch(err => {
          respondObj.response = err
          reject(respondObj)
        })
    })

    res.json(data)
  } catch (error) {
    console.log(err)
    next(error)
  }
}

module.exports = myLogic
