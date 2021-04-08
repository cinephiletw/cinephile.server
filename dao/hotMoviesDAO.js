let hot

class HotMoviesDAO {
  static async injectDB(conn) {
    if (hot) {
      return
    }
    try {
      hot = await conn.db("movies").collection("info");
    } catch (e) {
      console.error(`Unable to establish collection handles in hotMoviesDAO: ${e}`)
    }
  }

  static async homePageHotFetch() {
    try {
      let today = Math.floor(Date.now() / 1000);
      console.log(today)
      let twentyDaysAgo = today - 1728000;
      const pipeline = [
        {
          $project: {"movie_id":1, "title":1, "release_date":1}
        },
        {
          $match: {
            "$and": [
              {
                "release_date": {"$lt": today}
              }, 
              {
                "release_date": {"$gt": twentyDaysAgo}
              }
            ]
          }
        }
      ]

      const result = await hot.aggregate(pipeline)
      console.log(result)

      return await result.toArray()
    } catch (e) {
      console.error(`Unable to get hot movies: ${e}`)
      return { error: e }
    }
  }
}

module.exports = HotMoviesDAO;
