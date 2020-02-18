# HW1 API Calls and Expected Results
## Running the app.js
Please run the following:
```
# starting alll the process associated with ecosyste.config.js
$ pm2 start ecosystem.config.js

# restarting all the process associated with ecosystem.config.js
$ pm2 reload ecosystem.config.js

# stopping all the process associated with ecosystem.config.js
$ pm2 stop ecosystem.config.js

# killing all the process associated with ecosystem.config.js
$ pm2 delete ecosystem.config.js
```

## Home
#### http://52.53.163.38/
Landing page for our express server app.

Expected result:
```
  Hello From Express!
```


## Exchange
#### http://52.53.163.38/exchange
Returns the 160 stock exchange results with USD as base value.

Expected result:
```
{
  "status": 200,
  "statusText": "OK",
  "note": "API is called once per day only",
  "date": "2019-10-02T04:34:56+00:00",
  "params": {},
  "sourceAPI": "http://apilayer.net/api/live",
  "response": {
    "USDAED": 3.672973,
    ...
    "USDZWL": 322.000001
  }
}
```


#### http://52.53.163.38/exchange?to=:stock
Returns the value of the matching stock.

Expected result:
```
# if the :stock exists
{
  "status": 200,
  "statusText": "OK",
  "note": "API is called once per day only",
  "date": "2019-10-02T04:42:24+00:00",
  "params": {
    "to": "ZAR"
  },
  "sourceAPI": "http://apilayer.net/api/live",
  "response": 15.32255
}

# if the :stock does not exist
{
  "status": 204,
  "statusText": "No Content",
  "note": "API is called once per day only",
  "date": "2019-10-02T04:44:30+00:00",
  "params": {
    "to": "YODA"
  },
  "sourceAPI": "http://apilayer.net/api/live",
  "response": "DNE"
}
```
**Note:** If the query param is not "to", the API will return exact result as http://52.53.163.38/exchange.


## Top Subreddits
#### http://52.53.163.38/phyo
Returns the first 25 subreddits from the "reddit.com/subreddit".

Expected result:
```
{
  "status": 200,
  "statusText": "OK",
  "date": "2019-10-02T04:47:42.401Z",
  "params": {},
  "response": [
    "r/AskReddit",
    ...
    "r/unpopularopinion"
  ]
}
```


#### http://52.53.163.38/phyo?subreddit=:search
Returns the subreddit containing :search.

Expected result:
```
# if the :search exists
{
  "status": 200,
  "statusText": "OK",
  "date": "2019-10-02T04:54:15.165Z",
  "params": {
    "subreddit": "news"
  },
  "response": [
    "r/news",
    "r/worldnews"
  ]
}

# if the :search does not exist
{
  "status": 204,
  "statusText": "No Content",
  "date": "2019-10-02T04:55:16.345Z",
  "params": {
    "subreddit": "dota"
  },
  "response": "DNE"
}
```
**Note:** If the query param is not "subreddit", the API will return exact result as http://52.53.163.38/phyo.


## San Francisco Weather
#### http://52.53.163.38/michael
Returns the next 5 weather predictions for San Francisco

Expected result:
```
{
  "status": 200,
  "statusText": "OK",
  "date": "2019-10-02T04:58:44+00:00",
  "params": {},
  "sourceAPI": "http://api.openweathermap.org/data/2.5/forecast?id=5391997&APPID{KEY}",
  "response": [
    {
      "dt": 1569996000,
      ...
      "dt_txt": "2019-10-02 06:00:00"
    },
    ...
    {
      "dt": 1570417200,
      ...
      "dt_txt": "2019-10-07 03:00:00"
    }
  ]
}
```


#### http://52.53.163.38/michael?date=yyyy-mm-dd
Returns the weather resuslts for the given date in yyyy-mm-dd format.

Expected result:
```
# if yyyy-mm-dd exists
{
  "status": 200,
  "statusText": "OK",
  "date": "2019-10-02T05:05:02+00:00",
  "params": {
    "date": "2019-10-03"
  },
  "sourceAPI": "http://api.openweathermap.org/data/2.5/forecast?id=5391997&APPID{KEY}",
  "response": [
    {
      "dt": 1570060800,
      ...
      "dt_txt": "2019-10-03 00:00:00"
    },
    ...
    {
      "dt": 1570136400,
      ...
      "dt_txt": "2019-10-03 21:00:00"
    }
  ]
}

# if yyy-mm-dd does not exist
{
  "status": 204,
  "statusText": "No Content",
  "date": "2019-10-02T05:06:31+00:00",
  "params": {
    "date": "2019-11-01"
  },
  "sourceAPI": "http://api.openweathermap.org/data/2.5/forecast?id=5391997&APPID{KEY}",
  "response": "DNE"
}
```
**Note:** If the query param is not "date", the API will return exact result as http://52.53.163.38/michael.


## CSC 667 Homework 1 : Simple Express app

## Due: 10/2 by midnight (Your code must be on main)

## Git Invite: https://classroom.github.com/g/MYX7oYZo 

### Instructions
Create a simple express app with a single entry point named app.js. In teams of 3, each team member will create an endpoint that uses a third party rest api of your choice (not the same one). Each team member’s logic should go in its own file, and be imported into app.js. Each endpoint should have at least 1 get parameter. Handle errors with descriptive messages.


### General features
Run the app on an aws ec2 instance and post the public link in a readme along with instructions on calling it, and expected results. Make a list of the endpoints in the readme at tell me how to call with expected results.
Include a process file for running your app with pm2.
Create a middleware that logs the original url for any incoming request (app wide)


### Git workflow
No commits to master
Each team member creates their own branch
Create pull requests to merge data to master
Let other team members comment before commiting 


*DO NOT COMMIT:* node_modules, .DS_Store, any other random meta files that are not code


All endpoints should return a JSON response in this format:
"{
  “status” : “OK/ERROR”, // status of this message
  "date": "2019-02-10T20:40:59.257Z", // time that this was generated
  "params": {
    "a": "hello" // This is the query parameter(s)
  },
  "response": "world", // Return one single item for the response
}"
