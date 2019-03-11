var secret = require('../conf/secret');
var WXBizDataCrypt=require('../conf/WXBizDataCrypt');
var Redis=require('redis');
var client=require("../Redis/RedisServer")
var express = require('express');
var router = express.Router();
var request = require('request');
var wxuserDao=require('../dao/wxuserDao')
var util=require('../util/util');
// var uuid = require('node-uuid');
/* 微信登陆 */
var AppID = 'wx5e7537035eaaf2ba';
var AppSecret = '48424f8224b05cae5359abf8ea6a9a23';
router.get('/demo', function (req, res, next) {
    var code = req.query.code
    request.get({
      uri: 'https://api.weixin.qq.com/cgi-bin/token?',
      json: true,
      qs: {
        grant_type: 'client_credential',
        appid: 'wx5e7537035eaaf2ba',
        secret: '48424f8224b05cae5359abf8ea6a9a23',
      }
    },(err, response, data) => {
      if (response.statusCode === 200) {
          console.log(data);
        //   
        //   var secretValue = {
        //   openid: data.openid,
        //   session_key: data.session_key
        // }
        // var Secret=secret.random();
        // client.set(Secret, JSON.stringify(secretValue), 'EX', 7200);
        // var openid=data.openid;
      res.send({wxtoken:Secret})
      } else {
        // console.log("[error]", err)
        // var sessionValue = data.session_key + data.openid; 
        // res.json(err)
      }
    })
  })


module.exports = router;

