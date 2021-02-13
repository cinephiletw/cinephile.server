let popular

class PopularMoviesDAO {
  static async injectDB(conn) {
    if (popular) {
      return
    }
    try {
      popular = await conn.db("popular_movies").collection("movie_details");
    } catch (e) {
      console.error(`Unable to establish collection handles in popularMoviesDAO: ${e}`)
    }
  }

  static async homePagePopularFetch() {
    try {
      const pipeline = [{
        $project: {"id":1, "title":1, "vote_average":1, "release_date":1}
      }]

      const result = await popular.aggregate(pipeline)

      return await result.toArray()
    } catch (e) {
      console.error(`Unable to get popular movies: ${e}`)
      return { error: e }
    }
  }
}

module.exports = PopularMoviesDAO;

