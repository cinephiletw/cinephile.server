let coming

class ComingMoviesDAO {
  static async injectDB(conn) {
    if (coming) {
      return
    }
    try {
      coming = await conn.db("movies").collection("info");
    } catch (e) {
      console.error(`Unable to establish collection handles in popularMoviesDAO: ${e}`)
    }
  }

  static async homePageComingFetch() {
    try {
      let today = Math.floor(Date.now() / 1000);
      const pipeline = [
        {
          $match: {"release_date": {$gt: today}}
        },
        {
          $project: {"movie_id":1, "title":1}
        }
      ]

      const result = await coming.aggregate(pipeline)
      return await result.toArray()
    } catch (e) {
      console.error(`Unable to get popular movies: ${e}`)
      return { error: e }
    }
  }
}

module.exports = ComingMoviesDAO;
