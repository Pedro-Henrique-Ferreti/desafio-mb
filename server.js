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
  if (
    !req.body?.email
    || !req.body?.name
    || !req.body?.documentId
    || !req.body?.birthdate
    || !req.body?.phoneNumber
    || !req.body?.password
    || !req.body?.registerType
  ) {
    return res.sendStatus(400)
  }

  res.sendStatus(200) 
})

app.listen(port)