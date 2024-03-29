require('dotenv').config();
const express = require('express');
const router = express.Router();
const MoviesDAO = require( './../dao/moviesDAO' );
const MongoClient = require('mongodb').MongoClient;
const user = process.env.MONGODB_USER
const password = process.env.MONGODB_PASSWORD
const url = `mongodb+srv://${user}:${password}@movies.9gsbi.mongodb.net/movies?retryWrites=true&w=majority`;
let data
// connect to mongoDB for Home Page
// fetch data of popular movie with popoularMoviesDAO.js
router.get('/movie/:movieId', async (req, res) => {
  await MongoClient.connect(
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
      await MoviesDAO.injectDB(client)
      data = await MoviesDAO.movieInfoFetch(parseInt(req.params.movieId))
    })
  res.status(200).send({ data }).end();
});


module.exports = router;
