var secret = require('../conf/secret');
var WXBizDataCrypt=require('../conf/WXBizDataCrypt');
var Redis=require('redis');
var client=require("../Redis/RedisServer")
var express = require('express');
var router = express.Router();
var request = require('request');
var qrcodeDao=require('../dao/qrcodeDao')
var fs=require("fs");
var util=require('../util/Qrcodeutil');
var deleteimages=require('../util/util').delete;

router.all('/deSirQrcodeInfo',function(req,res,next){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var opt={}
         opt.scene=req.query.sign||req.body;
         util.create(opt.scene,function(data){
           if(data!=undefined || data!=null){
               opt.imgurl=data;
               if(opt.imgurl!=undefined){
                qrcodeDao.insertqrcodeInfo(opt,function(data){
                    if(data!=undefined && data=="SUCCESS"){
                        res.send(opt)
                    }else{
                        res.send("err")
                    }
               })
               }

           }
        })

    }
})


router.all('/findSirQrcodeList',function(req,res,next){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        qrcodeDao.selectqrcoseInfo(function(data){
            if(data!=undefined){
                res.send(data)
            }else{
                res.send("err")
            }
        })
    }
})

router.all('/dellSirQrcodeList',function(req,res,next){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var id=req.body.id;
        var filePath="./public/images/Qrcode/undefined.png";
        qrcodeDao.dellqrcodeInfo(id,function(data){
            if(data=="SUCCESS"){
                // deleteimages(filePath,function(data){
                //     if(data){
                //         res.send(data)
                //     }else{
                //         res.send("err")
                //     }
                // })
                res.send("SUCCESS");

            }else{
                res.send("err")
            }
        })
    }
})

router.all('/updateQrcodeList',function(req,res,next){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var info={}
        info.id=req.body.id;
        info.sign=req.body.sign;
        util.create(info,function(data){
            if(data!=undefined || data!=null){
                info.imgurl=data;
                qrcodeDao.updateqrcodeInfo(info,function(data){
                    if(data=="SUCCESS"){
                        var msg="SUCCESS";
                        res.send(msg);
                    }else{
                        req.send("err");
                    }
                })
            }else{
                req.send("err");
            }
        })
       
    }
})


module.exports = router;

