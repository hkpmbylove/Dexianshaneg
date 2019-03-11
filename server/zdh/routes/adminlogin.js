/**
 * Created by Kay on 2016/3/8.
 */
var secret = require('../conf/secret');
var fs=require('fs');
var userSession=require('../conf/userSessionStore').items;
var express = require('express');
var router = express.Router();
var request=require('request');
var Redis=require('redis');
var adminDao=require('../dao/adminDao');
var client=require('../Redis/RedisServer');





router.all('/',function(req,res){
    // request.get({
    //     uri: 'https://api.weixin.qq.com/cgi-bin/token?',
    //     json: true,
    //     qs: {
    //       grant_type: 'client_credential',
    //       appid: 'wx5e7537035eaaf2ba',
    //       secret: '48424f8224b05cae5359abf8ea6a9a23',
    //     }
    //   },(err, response, data) => {
    //     if (response.statusCode === 200) {
    //         console.log(data.access_token);
    //         var dd=data.access_token;
    //         if(data.access_token!=undefined){
    //          request({
    //           method: 'POST',
    //           url:"https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token="+dd,
    //           json: true,
    //           encoding:"base64",
    //           body: {
    //             scene:"qaii",
    //             //access_token:dd,
    //             page:"pages/index/index"
    //           }
    //          },(err, response, data) => {
    //           if (response.statusCode === 200) {
    //             //console.log(data)
    //             res.send(data)
    //           }
    //          }).pipe(fs.createWriteStream('./public/images/index.png'));
    //         }
    //       //   
    //       //   var secretValue = {
    //       //   openid: data.openid,
    //       //   session_key: data.session_key
    //       // }
    //       // var Secret=secret.random();
    //       // client.set(Secret, JSON.stringify(secretValue), 'EX', 7200);
    //       // var openid=data.openid;
    //   //  res.send({wxtoken:Secret})
    //     } else {
    //       // console.log("[error]", err)
    //       // var sessionValue = data.session_key + data.openid; 
    //       // res.json(err)
    //     }
    //   })
        
    res.render('admin/adminlogin',{})
})



router.all('/DZX6lPffof.txt',function(req,res){
    var text=fs.readFileSync("./public/DZX6lPffof.txt");
    res.send(text);
})



// router.all('/other', function(req, res, next) {
//     request.post("http://html.rhhz.net:8080/wechat/archivejournal/?issueName=zdhxb",function(error, response, body){
//         //res.render("admin/zdhxuebao",body)
//         res.sendFile(body)
//        //res.redirect("http://html.rhhz.net:8080/wechat/archivejournal/?issueName=zdhxb")
//     })

 
//   })



router.all('/admin',function(req,res){
    var info=req.body || req.query;
    var admininfo={};
     admininfo.username=info.username;
     admininfo.pwd=info.pwd;
    
    adminDao.selectadminAccountAndPWD(admininfo,function(data){
        if(!data){
            res.send({msg:"无管理员账号"})
        }else if(data.admin_account!=info.username || data.admin_pwd!=info.pwd){
            res.send({msg:"登陆失败，请检查账号和密码"})
        }else {
              req.session.userName = req.body.username;
              //req.session.userName = "admin";
              res.send({msg:"href"})
        }
    })

    
})

router.all('/welcome',function(req,res){
    console.log(req.session.userName)
   if(req.originalUrl != "/" && !req.session.userName){
     res.redirect("/");
   }else{
    res.render('admin/welcome')
   }
   
    
})

router.all('/module',function(req,res){
    console.log(req.session.userName)
   if(req.originalUrl != "/" && !req.session.userName){
     res.redirect("/");
   }else{
    res.render('admin/module')
   }
   
    
})

router.all('/myManage',function(req,res){
    console.log(req.session.userName)
   if(req.originalUrl != "/" && !req.session.userName){
     res.redirect("/");
   }else{
    res.render('admin/myManage')
   }
   
    
})

router.all('/newsAdd',function(req,res){
    console.log(req.session.userName)
   if(req.originalUrl != "/" && !req.session.userName){
     res.redirect("/");
   }else{
    res.render('admin/newsAdd')
   }
   
    
})


function adminStatusSaveRedis(admintoken,sms){
    if(client){
        client.set(admintoken,sms);
        client.expire(admintoken,10*60); 
    }else{
        console.log('redis client instance is not exist.');
    }
} 

function sessionStatus(url,userName,next){
    if(url!='/' && !userName){
        return res.redirect("/");
    }
    next();
}



module.exports = router;