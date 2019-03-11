// pages/main/index.js
var QR = require("./../../../utils/qrcode.js");
import host from '../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({
  data: {
    canvasHidden: false,
    maskHidden: true,
    imagePath: '',
    placeholder: 'https://mp.weixin.qq.com/s/jdWsUC8y69z4MFRg1LTx3A',//默认二维码生成文本,
    wxphone:"",
    orderlist:"",
    codeCreat:""
  },
  home: function (e) {
    wx.switchTab({
      url: '../../index/index',
    })
  },
  news: function (e) {
    wx.switchTab({
      url: '../../news/news',
    })
  },
  admin: function (e) {
    wx.switchTab({
      url: '../../home/home',
    })
  },

  onReady: function (e) {
   
  },

  onShow: function () {
    var self=this;
    if (self.data.wxphone == null || self.data.wxphone == "" || self.data.wxphone==undefined){
      wx.getStorage({
        key: 'wxphone',
        success: function (res) {
          self.setData({
            wxphone: res.data
          })
          wx.request({
            url: serverURL + '/orders/wxorders',
            data: {
              token: app.globalData.token,
              // phone: self.data.wxphone
              phone:15192752963
            },
            success: function (res) {
              if (res.data == "err") {
                wx.showModal({
                  title: '提示',
                  content: '登陆过期',
                  complete: function () {
                    wx.redirectTo({
                      url: '/pages/login/login',
                      success: function () {
                        app.login();
                      }
                    })
                  }
                })
              } else if (res.data == "SERVERERR") {
                
              } else {
                  var orderlist=res.data;
                  var arr = [];
                  for (var obj of orderlist) {
                    arr.push(obj)
                  }
                  arr.sort(function (a, b) {
                    return Date.parse(b.order_endtime) - Date.parse(a.order_endtime);//时间正序
                  });
                  for (var i = 0, l = arr.length; i < l; i++) {
                    var num,id,st;
                    num = arr[i].order_Num;
                    id = arr[i].order_id;
                    var size = self.setCanvasSize();
                    //绘制二维码
                    self.createQrCode(num, id, size.w, size.h);
                    clearTimeout(st);
                    self.setData({
                      orderlist: arr
                    })
                   
                    
                  }

              }
            }, fail: function (res) {
              console.log(res)
            }
          })
          
        }
      })

    }


    
  },

  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 /350;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => { this.canvasToTempImage(); }, 1000);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
          // canvasHidden:true
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  }
  


})