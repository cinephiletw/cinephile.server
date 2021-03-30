require('dotenv').config();
const express = require('express');
const router = express.Router();
const ComingMoviesDAO = require( './../dao/comingMoviesDAO' );
const MongoClient = require('mongodb').MongoClient;
const user = process.env.MONGODB_USER
const password = process.env.MONGODB_PASSWORD
const url = `mongodb+srv://${user}:${password}@movies.9gsbi.mongodb.net/movies?retryWrites=true&w=majority`;
let comingData

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
    await ComingMoviesDAO.injectDB(client)
    dataata = await ComingMoviesDAO.homePageComingFetch()
    console.log(comingData)
  })
router.get('/', (req, res) => {
  res.status(200).send({ data }).end();
})

module.exports = router;
