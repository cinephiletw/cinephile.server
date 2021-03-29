require('dotenv').config();
const express = require('express');
const router = express.Router();
const HotMoviesDAO = require( './../dao/hotMoviesDAO' );
const MongoClient = require('mongodb').MongoClient;
const user = process.env.MONGODB_USER
const password = process.env.MONGODB_PASSWORD
const url = `mongodb+srv://${user}:${password}@movies.9gsbi.mongodb.net/movies?retryWrites=true&w=majority`;
let hotData

MongoClient.connect(
  url,
  {useNewUrlParser: true},
  {useUnifiedTopology: true},
  {poolSize: 5},
)
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await HotMoviesDAO.injectDB(client)
    hotData = await HotMoviesDAO.homePageHotFetch()
    console.log(hotData)
  })
router.get('/', (req, res) => {
  res.status(200).send({ hotData }).end();
})

module.exports = router;
