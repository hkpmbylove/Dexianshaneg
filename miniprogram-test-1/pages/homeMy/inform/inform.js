// pages/main/index.js
import host from '../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({
  data: {
    canvasHidden: false,
    maskHidden: true,
    wxphone: "",
    orderlist: "",
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
    var self = this;
    console.log("wwww:" + self.data.wxphone)
    if (self.data.wxphone == null || self.data.wxphone == "" || self.data.wxphone == undefined) {
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
             
              phone: self.data.wxphone
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
                var orderlist = res.data;
                var arr = [];
                for (var obj of orderlist) {
                  arr.push(obj)
                }
                arr.sort(function (a, b) {
                  return Date.parse(b.order_endtime) - Date.parse(a.order_endtime);//时间正序
                });
                for (var i = 0, l = arr.length; i < l; i++) {
                  var num, id, st;
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



  }


})