let movies

class MoviesDAO {
  static async injectDB(conn) {
    if (movies) {
      return
    }
    try {
      movies = await conn.db("movies").collection("info");
    } catch (e) {
      console.error(`Unable to establish collection handles in moviesDAO: ${e}`)
    }
  }

  static async movieInfoFetch() {
    try {
      const pipeline = [{
        $project: {}
      }]

      const result = await movies.find()

      return await result.toArray()
    } catch (e) {
      console.error(`Unable to get popular movies: ${e}`)
      return { error: e }
    }
  }
}

module.exports = MoviesDAO;
