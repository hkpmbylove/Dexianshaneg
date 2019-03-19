var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./qrcodeSqlMapping');
var time=require('../util/TimeUtil');
var async = require('async');
 
// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({},$conf.mysql));

module.exports = {
    insertqrcodeInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.insertqrcodeInfo,[req.scene.sign,req.imgurl],function(err,results,fields){
                if(err)throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg)
            })
        })

    },
    selectqrcoseInfo:function(callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectqrcoseInfo,function(err,results,fields){
                if(err)throw err;
                connection.release();
                callback(results);
            })
        })
    },
    dellqrcodeInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.dellqrcodeInfo,[req],function(err,results,fields){
                if(err)throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg)
            })
        })
    },
    updateqrcodeInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.updateqrcodeInfo,[req.sign,req.imgurl,req.id],function(err,results,fields){
                if(err)throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg)
            })
        })
    }
}