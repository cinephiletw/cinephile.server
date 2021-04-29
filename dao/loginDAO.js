let userData = {"user_name": "Max", "user_password": "851010"};
let user
let errMessage = {};

class LoginDAO {
  static async injectDB(conn) {
    if (user) {
      return;
    }
    try {
      user = await conn.db("users").collection("info");
    } catch (e) {
      console.error(`Unable to establish collection handles in loginDAO: ${e}`);
    }
  };

  static async userLogin() {
    try {
      const pipeline = [{
        $match: {
          $and: 
            [
              {"user_name": userData.user_name},
              {"user_password": userData.user_password}
            ]
        }
      }]

      const result = await user.aggregate(pipeline);
      return await result.toArray();
    } catch (e) {
      errMessage.status = "fail to login";
      errMessage.err = e;
      return;
    }
  };
};

module.exports = LoginDAO;
