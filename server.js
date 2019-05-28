// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors')
app.use(cors({optionSuccessStatus: 200})) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})


// your first API endpoint... 
app.get("/api/timestamp/:date_string?", (req, res) => {
  let date = new Date(req.params.date_string)
  if (req.params.date_string === undefined) {
    date = new Date(Date.now())
  } else {
    let timestamp = parseInt(req.params.date_string * 1, 10)
    if (timestamp) {
      date = new Date(timestamp)
    }
  }
  res.json((date === 'Invalid Date') ? {'unix': null, 'utc': 'Invalid Date'} : {'unix': date.getTime(), 'utc': date.toUTCString()})
})



// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})