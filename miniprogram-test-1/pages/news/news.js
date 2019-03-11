// pages/news/news.js
import host from '../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    metingInfo:"",
    imgUrlss: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null, currentItem1: true
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

  //点击事件动态传参
  urlNav: function (e) {
    var uId = e.currentTarget.id;
    var metingInfo = this.data.metingInfo;
    var original = metingInfo[uId].metting_original;
    wx.setStorageSync('original', original);
    wx.navigateTo({
      url: '../detailnews/detailnews',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
        var self = this;
        wx.getStorage({
          key: 'metingInfo',
          success: function(res) {
            self.setData({
               metingInfo: res.data
           })
          },
        })
          wx.getStorage({
            key: 'imgUrls',
            success: function (res) {
              self.setData({
                imgUrlss: res.data.carousel_url
              })
            },
          })

    wx.request({
      url: serverURL + '/news/wxnews',
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
            content: "新闻列表获取失败",
          })
        } else {
          var metingInfo = res.data;

          var arr = [];
          for (var obj of metingInfo) {
            arr.push(obj)
          }
          arr.sort(function (a, b) {
            return Date.parse(b.metting_startTime + " 00:00:00") - Date.parse(a.metting_startTime + " 00:00:00");//时间正序
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
  },


})