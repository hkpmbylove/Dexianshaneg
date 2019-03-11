// pages/Schedule/Schedule.js
import host from '../../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    wxphone:"",
    smsphone:"",
    ticketTitle:null,
    ticketPrice:null,
    ticketName:null
  },
  pay: function () {
    var self=this;
    var phone = self.data.wxphone;
    var openid = app.globalData.token;
    var title = this.data.ticketTitle;
    var price = this.data.ticketPrice;
    wx.request({
      url: serverURL + '/wxPay/wx_pay',
      data: {
        openid: openid,
        title: title,
        price: price,
        phoneNum:phone
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
//        console.log(res.data)
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
        } else if (res.data.status == "102") {
          wx.showModal({
            title: '提示',
            content: "服务器错误",
          })
        } else if (res.data.status == 100) {
          var payModel = res.data;
          console.log(payModel);
          wx.requestPayment({
            'timeStamp': payModel.timestamp,
            'nonceStr': payModel.nonceStr,
            'package': payModel.package,
            'signType': 'MD5',
            'paySign': payModel.paySign,
            'success': function (res) {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000,
                complete:function(){
                  wx.redirectTo({
                    url: '../../../homeMy/ticket/ticket'
                  })
                }
              })
            },
            'fail': function (res) {
              console.log(JSON.stringify(res));
              if (res.errMsg == "requestPayment:fail cancel") {
                wx.showToast({
                  title: '取消支付',
                  icon: 'fail',
                  duration: 2000,
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: "支付发起失败",
                })
              }
            }
          })
        }
      }
    })

  },
  onLoad: function (options) {
    var self = this;
//    console.log(options);
    var title = wx.getStorageSync('ticketTitle');
    var price = wx.getStorageSync('ticketPrice');
    var userName = wx.getStorageSync('ticketName')
    self.setData({
      ticketTitle: title,
      ticketPrice: price,
      ticketName: userName
    })
  },

  onShow:function(){
    var self=this;
    wx.getStorage({
      key: 'wxphone',
      success: function (res) {
        self.setData({
          wxphone:res.data
        })
//        console.log("微信手机号：" + res.data)
      }
    })
  }
})