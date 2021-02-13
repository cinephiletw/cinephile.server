require('dotenv').config();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());


app.post('/send', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`server start on port ${port}`);
});
