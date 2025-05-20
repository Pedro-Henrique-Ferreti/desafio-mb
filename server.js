const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const port = 3000

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
})

app.post('/registration', (req, res) => {
  console.log(req.body)

  if (!req.body) {
    return res.sendStatus(400)
  }

  res.sendStatus(200) 
})

app.listen(port)