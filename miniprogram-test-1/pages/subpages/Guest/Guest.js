// pages/Schedule/Schedule.js
import host from '../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://www.iv2018.cn/public/images/webImage/1527577085667.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    guestInfo:""
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self=this;
    wx.request({
      url: serverURL +'/guests/wxguests',
      data: {
        token: app.globalData.token,
      },
      success:function(res){
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
            self.setData({
              guestInfo:res.data
            })
        }
      }
    })
  },


})