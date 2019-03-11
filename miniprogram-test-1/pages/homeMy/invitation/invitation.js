// pages/news/news.js
import host from '../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    metingInfo: "",
    imgUrlss: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    userInfo: {
      avatarUrl: "",//用户头像  
      nickName: "",//用户昵称  
    }  
  },
  onShareAppMessage: function () {
    return {
      title: 'IV IEEE 2018',
      desc: '第29届IEEE智能车IV大会!',
      path: 'pages/login/login',
    }
  },
  onLoad: function (options) {
    var that = this;
    /**  
     * 获取用户信息  
     */
    wx.getUserInfo({
      success: function (res) {
//        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })
  },  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this;
    wx.getStorage({
      key: 'metingInfo',
      success: function (res) {
        self.setData({
          metingInfo: res.data
        })
      },
    })

    wx.request({
      url: serverURL + '/invite/selectAllinviet',
      data: {
        token: app.globalData.token,
      },
      success: function (res) {
//        console.log(res.data);
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
          wx.showModal({
            title: '提示',
            content: "新闻列表获取失败",
          })
        } else {
          self.setData({
            metingInfo: res.data
          })
        }
      }, fail: function (res) {
        console.log(res)
      }
    })
  },


})