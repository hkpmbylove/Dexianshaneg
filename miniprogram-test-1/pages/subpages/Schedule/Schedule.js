import host from '../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({
  data: {
    imgUrls: [
      'https://www.iv2018.cn/public/images/webImage/1527577085667.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    showView: true,
    schedul1:true,
    schedul2: false,
    schedul3: false,
    schedul4: false,
    schedul5: false,
    line1:true,
    line2:false,
    line3:false,
    line4: false,
    line5: false,
    uhide:64,
    dateList26 :"",
    dateList27: "",
    dateList28 : "",
    dateList29 : "",
    dateList30 : "",
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
  home:function(e){
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
  schedul1:function(e){
    this.setData({
      schedul1:true,
      schedul2: false,
      schedul3: false,
      schedul4: false,
      schedul5: false,
      line1: true,
      line2: false,
      line3: false,
      line4: false,
      line5: false
    })
  },
  schedul2: function (e) {
    this.setData({
      schedul1: true,
      schedul2: true,
      schedul3: false,
      schedul4: false,
      schedul5: false,
      line1: false,
      line2: true,
      line3: false,
      line4: false,
      line5: false
    })
  },
  schedul3: function (e) {
    this.setData({
      schedul1: true,
      schedul2: true,
      schedul3: true,
      schedul4: false,
      schedul5: false,
      line1: false,
      line2: false,
      line3: true,
      line4: false,
      line5: false
    })
  },
  schedul4: function (e) {
    this.setData({
      schedul1: true,
      schedul2: true,
      schedul3: true,
      schedul4: true,
      schedul5: false,
      line1: false,
      line2: false,
      line3: false,
      line4: true,
      line5: false
    })
  },
  schedul5: function (e) {
    this.setData({
      schedul1: true,
      schedul2: true,
      schedul3: true,
      schedul4: true,
      schedul5: true,
      line1: false,
      line2: false,
      line3: false,
      line4: false,
      line5: true
    })
  },
  onLoad: function (options) {
      var self=this
    // 生命周期函数--监听页面加载
    showView: (options.showView == "true" ? true : false);
   
  },
  getData:function(){
  
  }
  //切换隐藏和显示 
  ,toggleBtn: function (event) {
    var that = this;
    var toggleBtnVal = that.data.uhide;
    var itemId = event.currentTarget.id;
   
    if (toggleBtnVal == itemId) {
      that.setData({
        uhide: 0
      })
    } else {
      that.setData({
        uhide: itemId
      })
    }
  }
  , onChangeShowState: function () {

    var that = this;

    that.setData({

      showView: (!that.data.showView)

    })

  },
  onShow:function(){
    var that=this;
    var ID = 26;
    wx.request({
      url: serverURL + '/schedule/wxschedule',
      data: {
        token: app.globalData.token,
        "ID": ID
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

          var dataList = res.data;

          var arr = [];
          for (var obj of dataList) {
            arr.push(obj[0])
          }
          arr.sort(function (a, b) {
            return Date.parse(a.schedule_time_dan) - Date.parse(b.schedule_time_dan);//时间正序
          });
          for (var i = 0, l = arr.length; i < l; i++) {
            arr[i].schedule_time_dan = arr[i].schedule_time_dan.substring(10, 18);
            
            that.setData({
              dateList26: arr,
            })
          }
        }
      }, fail: function (res) {
       
      }
    })
    
    var ID27 = 27;
    wx.request({
      url: serverURL + '/schedule/wxschedule',
      data: {
        token: app.globalData.token,
        "ID": ID27
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
          var dataList = res.data;

          var arr = [];
          for (var obj of dataList) {
            arr.push(obj[0])
          }
          arr.sort(function (a, b) {
            return Date.parse(a.schedule_time_dan) - Date.parse(b.schedule_time_dan);//时间正序
          });
          for (var i = 0, l = arr.length; i < l; i++) {
            arr[i].schedule_time_dan = arr[i].schedule_time_dan.substring(10, 18);
            
            that.setData({
              dateList27: arr,
            })
          }
        }
  


      }, fail: function (res) {
        
      }
    })
    var ID28 = 28;
    wx.request({
      url: serverURL + '/schedule/wxschedule',
      data: {
        token: app.globalData.token,
        "ID": ID28
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
          var dataList = res.data;

          var arr = [];
          for (var obj of dataList) {
            arr.push(obj[0])
          }
          arr.sort(function (a, b) {
            return Date.parse(a.schedule_time_dan) - Date.parse(b.schedule_time_dan);//时间正序
          });
          for (var i = 0, l = arr.length; i < l; i++) {
            arr[i].schedule_time_dan = arr[i].schedule_time_dan.substring(10, 18);
            
            that.setData({
              dateList28: arr,
            })
          }
        }
      }, fail: function (res) {
        
      }
    })

    var ID29 = 29;
    wx.request({
      url: serverURL + '/schedule/wxschedule',
      data: {
        token: app.globalData.token,
        "ID": ID29
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
          var dataList = res.data;

          var arr = [];
          for (var obj of dataList) {
            arr.push(obj[0])
          }
          arr.sort(function (a, b) {
            return Date.parse(a.schedule_time_dan) - Date.parse(b.schedule_time_dan);//时间正序
          });
          for (var i = 0, l = arr.length; i < l; i++) {
            arr[i].schedule_time_dan = arr[i].schedule_time_dan.substring(10, 18);
            
            that.setData({
              dateList29: arr,
            })
          }
        }

      }, fail: function (res) {
        
      }
    })
     var ID30 = 30;
    wx.request({
      url: serverURL + '/schedule/wxschedule',
      data: {
        token: app.globalData.token,
        "ID": ID30
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
          var dataList = res.data;

          var arr = [];
          for (var obj of dataList) {
            arr.push(obj[0])
          }
          arr.sort(function (a, b) {
            return Date.parse(a.schedule_time_dan) - Date.parse(b.schedule_time_dan);//时间正序
          });
          for (var i = 0, l = arr.length; i < l; i++) {
            arr[i].schedule_time_dan = arr[i].schedule_time_dan.substring(10, 18);
            that.setData({
              dateList30: arr,
            })
          }
        }

      }, fail: function (res) { 
      }
    })

   
  }
})



