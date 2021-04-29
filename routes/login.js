require('dotenv').config();
const express = require('express');
const router = express.Router();
const LoginDAO = require('./../dao/loginDAO');
const MongoClient = require('mongodb').MongoClient;
const mongoUser = process.env.MONGODB_USER;
const mongoPassword = process.env.MONGODB_PASSWORD;
const url = `mongodb+srv://${mongoUser}:${mongoPassword}@movies.9gsbi.mongodb.net/movies?retryWrites=true&w=majority`;
let loginData;

MongoClient.connect(
  url,
  {useNewUrlParser: true},
  {useUnifiedTopology: true},
  {poolSize: 5},
)
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    await LoginDAO.injectDB(client);
    loginData = await LoginDAO.userLogin();
  })

router.get('/', (req, res) => {
  if (loginData){
    res.status(200).json({
      result: {
        status: "登入成功",
        loginMemeber: `歡迎${loginData[0].user_name}！`
      }
    })
  } else {
    res.status(200).json({
      result: {
        status: "登入失敗",
        err: "請輸入正確的帳號密碼!"
      }
    })
  }
})

module.exports = router;
