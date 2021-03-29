let popular

class PopularMoviesDAO {
  static async injectDB(conn) {
    if (popular) {
      return
    }
    try {
      popular = await conn.db("movies").collection("info");
    } catch (e) {
      console.error(`Unable to establish collection handles in popularMoviesDAO: ${e}`)
    }
  }

  static async homePagePopularFetch() {
    try {
      const pipeline = [
        {
          $project: {"movie_id":1, "title":1, "imdb_rate":1}
        },
        {
          $match: {"imdb_rate": {"$gt": 7}}
        }
      ]

      const result = await popular.aggregate(pipeline)

      return await result.toArray()
    } catch (e) {
      console.error(`Unable to get popular movies: ${e}`)
      return { error: e }
    }
  }
}

module.exports = PopularMoviesDAO;

