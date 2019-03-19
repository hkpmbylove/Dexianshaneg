var fs = require('fs'); 
var request = require('request'); 
var wx_conf = require('../conf/wxPayconfig');//这里放了微信appid跟appSecret，文件没有引入进来，要用的时候，改一下吧。 
var AccessToken = { 
 grant_type: 'client_credential', 
 appid: wx_conf.AppID, 
 secret: wx_conf.Secret 
} 
var wx_gettoken_url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=' + AccessToken.grant_type + '&appid=' + AccessToken.appid + '&secret=' + AccessToken.secret; 
//请求二维码的参数 
var msg={
    SUCCESS:"SUCCESS",
    ERR:"ERR"
}
var postData = {}
var filename; 
var createQrcode = { 
 create: function(obj,callback) {
     var scene=obj.sign;
    filename=obj.sign;
    postData.path= "pages/login/login",
    postData.scene=scene;
  this.getToken(callback);
 }, 
 //获取微信的token 
 getToken: function(callback) { 
  //console.log('fn：getToken'); 
  var that = this; 
  new Promise((resolve, reject) => { 
  // console.log('进入Promise方法了'); 
   request({ 
    method: 'GET', 
    url: wx_gettoken_url 
   }, function(err, res, body) { 
    if (res) { 
     resolve({ 
      isSuccess: true, 
      data: JSON.parse(body), 
     }); 
    } else {  
        callback (err); 
     reject({ 
      isSuccess: false, 
      data: err 
     }); 
       
    } 
   }) 
  }).then(proData => { 
   that.getQrcode(proData,callback); 
  }); 
 }, 
 //生成二维码 
 getQrcode: function(proData,callback) { 
  if (proData.isSuccess) { 
   postData = JSON.stringify(postData); 
   var imgpath='./public/images/Qrcode/'+filename +'.png';
   var writeStream=fs.createWriteStream(imgpath);
   var WStream =request({ 
    method: 'POST', 
    url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + proData.data.access_token, 
    body: postData 
   });//路径自己定义吧 
    WStream.pipe(writeStream);
    writeStream.on('finish',function(){
        callback (imgpath);
    });   
  } else { 
    callback (msg.ERR);
  } 
 } 
} 
module.exports = createQrcode;//暴露对象，调用create方法既可以创建二维码 
