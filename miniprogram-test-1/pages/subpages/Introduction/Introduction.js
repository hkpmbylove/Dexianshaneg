// pages/Introduction/Introduction.js
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
    IntroductionInfo:"",
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    tempFilePaths: '',
    motto: '分享给朋友',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  //分享按钮函数
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: 'IV 2018小程序',
      path: 'pages/login/login',
      success: function (res) {
        // 转发成功
        console.log("转发成功");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败");
      }
    }

  },

  sign:function(){
    wx.redirectTo({
      url: '../Registor/Registor'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self=this;
    wx.request({
      url: serverURL + '/Introduction/select',
      data:{
        token: app.globalData.token,
      },
      success:function(res){
        console.log(res)
        if (res.data == "err") {
          wx.showModal({
            title: '提示',
            content: '登陆过期',
            complete: function () {
              wx.redirectTo({
                url: '/pages/login/login',
                success:function(){
                  app.login();
                }
              })
            }
          })
        } else if (res.data == "SERVERERR") {
          wx.showModal({
            title: '提示',
            content: "大会简介获取失败",
          })
        } else {
          self.setData({
            IntroductionInfo: res.data
          })
        }
      }
    })
  }

})