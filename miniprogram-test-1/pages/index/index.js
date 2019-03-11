import host from '../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({
  data: {
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    metingInfo: "",
    currentItem1:true
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
    if (that.data.currentItem1==true){
      that.onShow();
      that.onLoad();
      that.setData({
        currentItem1:false
      });
      
    }
    
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();
  },  
  
  //点击事件动态传参
  urlNav:function(e){
    var self=this
    var uId = e.currentTarget.id
    console.log(uId)
    var title = self.data.metingInfo[uId][0].metting_original;
    console.log(title);
    wx.navigateTo({
      url: '../detail/detail?title=' + title,
    }) 
  },
  introduce:function(){
    wx.navigateTo({
      url: '../subpages/Introduction/Introduction'
    })
  },
  schedule: function () {
    wx.navigateTo({
      url: '../subpages/Schedule/Schedule'
    })
  },
  registor: function () {
    wx.navigateTo({
      url: '../subpages/Registor/Registor'
    })
  },
  guest: function () {
    wx.navigateTo({
      url: '../subpages/Guest/Guest'
    })
  },
  cooperator: function () {
    wx.navigateTo({
      url: '../subpages/Cooperator/Cooperator'
    })
  },
  stay: function () {
    wx.navigateTo({
      url: '../subpages/Stay/Stay'
    })
  },
  contact: function () {
    wx.navigateTo({
      url: '../subpages/Contact/Contact'
    })
  },
  news: function () {
    wx.navigateTo({
      url: '../subpages/News/News'
    })
  },
  onLoad: function () {
    var self = this;
    wx.request({
      url: serverURL + '/index/carouselinfo',
      data: {
        token: app.globalData.token,
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
          wx.showModal({
            title: '提示',
            content: "服务器错误",
          })
        } else {
          self.setData({
            imgUrls: res.data
          })
          wx.setStorage({
            key: "imgUrls",
            data: res.data[0]
          })

        }
      }, fail: function (res) {
      }
    })
  },
  
  onShow: function () {
    
    var self = this;
    wx.request({
      url: serverURL + '/index/mettinginfo',
      data: {
        token: app.globalData.token,
      },
      success: function (res) {
        console.log(app.globalData.token);
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
          var metingInfo = res.data;
          var arr = [];
          for (var obj of metingInfo) {
            arr.push(obj[0])
          }
          arr.sort(function (a, b) {
            return Date.parse(b.metting_startTime) - Date.parse(a.metting_startTime);//时间正序
          });
          for (var i = 0, l = arr.length; i < l; i++) {
            self.setData({
              metingInfo: arr
            })
          }
        }
      }, fail: function (res) {
        console.log(res)
      }
    })

  }

})