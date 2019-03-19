import host from '../../host/host';
var serverURL = host.SERVER_URL;
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    modalHidden2: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:"",
    wxphone:"",
    currentItem1: true
  },
  // 下拉刷新  
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () {
      that.setData({
        currentItem1: true
      });
    }, 5000);
    if (that.data.currentItem1 == true) {
      that.onShow();
      that.setData({
        currentItem1: false
      });
    }
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();
  },   
  getPhoneNumber: function (e) {
    var self=this;
    if (self.data.userInfo == undefined || self.data.userInfo == "" || self.data.userInfo==null ){
      this.scorp();
     // self.phoneUtil(e);
    }else{
      self.phoneUtil(e);
    }

  },
  getphone:function(e){
    wx.navigateTo({
      url: '/pages/sms/sms',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  phoneUtil:function(e){
    var self=this;

    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else if (e.detail.errMsg == "getPhoneNumber:fail:cancel to confirm login") {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
      })
    }else {
          var encryptedData = e.detail.encryptedData;
          var iv = e.detail.iv;
          wx.showLoading({
            title: '登陆中',
          })
          wx.request({
            url: serverURL + '/weixin/encryptData',
            data: {
              encryptedData: encryptedData,
              iv: iv,
              token: app.globalData.token,
              wxuserInfo: self.data.userInfo
            },
            success: function (res) {
              if (res.data.wxphone){
                wx.setStorage({
                  key: "wxphone",
                  data: res.data.wxphone,
                })
              }else{
                wx.showModal({
                  title: '提示',
                  content: '网络异常',
                })
              }
              if (res.data == "err") {
                wx.showModal({
                  title: '提示',
                  content: '登陆过期',
                  complete: function () {
                    app.login();
                  }
                })
              } else if(res.data.msg=="LOGINSUCCESS"){
                wx.redirectTo({
                  url: '/pages/subpages/News/News',
                  success:function(){
                    // wx.showLoading({
                    //   title: '登陆成功',
                    //   icon: 'success',
                    // })
                  },
                  fail:function(){
                    wx.showModal({
                      title: '提示',
                      content: '登陆失败',   
                    })
                  }
                })
              } else if (res.data.msg == "REGISTEREDSUCCESS"){
                wx.redirectTo({
                  url: '/pages/subpages/News/News',
                  success: function () {
                    wx.showLoading({
                      title: '注册登陆成功',
                      icon: 'success',
                      duration: 2000
                    })
                  },
                  fail: function () {
                    wx.showModal({
                      title: '提示',
                      content: '注册登陆失败',
                    })
                  }
                })
              } else if (res.data.msg == "ADMINLOGINSUCCESS"){
                console.log(res.data.msg);
                wx.redirectTo({
                  url: '/pages/index/index',
                  success: function () {
                    wx.showLoading({
                      title: '管理员登陆成功',
                      icon: 'success',
                      duration: 500
                    })
                  },
                  fail: function () {
                    wx.showModal({
                      title: '提示',
                      content: '管理员登陆失败',
                    })
                  }
                })
              } else if (res.data =="Eerr"){
                wx.showModal({
                  title: '提示',
                  content: '登录失败请刷新页面',
                  complete:function(){
                    app.login();
                  }
                })
              }
                else{
                wx.showModal({
                  title: '提示',
                  content: '服务器错误',
                })
              }
            },
            fail:function(){
              wx.showModal({
                title: '提示',
                content: '服务器未响应',
              })
            }
          })

    }
  },onShow:function(){
    this.scorp()
  
   
  },
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  scorp: function () {
    var self = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              self.setData({
                userInfo: res.userInfo
              })
            }
          })
        } else {
           this.modalTap2();

        }
      }, fail: function (res) {
        console.log("接口调用失败")    
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.errMsg =="getUserInfo:fail auth deny"){
        wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    }else{
      var self = this;
      self.setData({
        userInfo: e.detail.userInfo,
        modalHidden2: true
      })
   }
  
    
  },
  modalChange2: function (e) {
    var self=this;
    wx.showModal({
      title: '警告',
      content: '未授权将无法使用小程序',
      complete: function () {
        self.setData({
          modalHidden2: false,
        })
      }
    })

  },
  modalChange: function (e) {

    this.setData({
      modalHidden: true
    })
  },
  onLoad: function (options){
    var sence=decodeURIComponent(options)
    if (sence!=undefined){
      console.log(options.scene);
      wx.setStorage({
        key: "sence",
        data: options.scene
      })

    }
  },
  contact: function () {
    wx.navigateTo({
      url: '../subpages/Contact/Contact'
    })
  },
  news: function () {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  }

})