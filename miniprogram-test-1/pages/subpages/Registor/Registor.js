// pages/Schedule/Schedule.js
import host from '../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    phone:"",
    uhide:5,
    list:""
  },
  //切换隐藏和显示 
  toggleBtn: function (event) {
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
  },
  toDetail:function(e){
    var index = e.currentTarget.dataset.index;
    var ProList = this.data.list;
    var ticketType = ProList[index].ticket_type;
    var ticketTitle = ProList[index].ticket_mark;
    var ticketContent = ProList[index].ticket_details;
    var ticketPrice = ProList[index].ticket_price;
    var ticketMark = ProList[index].ticket_mark;
    var ticketId = ProList[index].ticket_id;
    wx.setStorageSync('ticketType', ticketType)
    wx.setStorageSync('ticketTitle', ticketTitle);
    wx.setStorageSync('ticketContent', ticketContent);
    wx.setStorageSync('ticketPrice', ticketPrice);
    wx.setStorageSync('ticketId', ticketId);
    wx.setStorageSync('ticketMark', ticketMark);
    var openid = app.globalData.token;
    //<!--全天，半天，非会员  -->
    if (ticketType == 'half' || ticketType == 'allday' || ticketType == 'novip'){
      wx.request({
        url: serverURL + '/mainuserInfo/selectnoVip',
        data: {
          phone: this.data.phone,
          token: openid
        },
        success: function (res) {
          if (res.data.msg == "已存在") {
           
              wx.navigateTo({
                url: '../../subpages/Reg/sure/sure',
              })
            
          } else if (res.data.msg == "不存在") {
            wx.navigateTo({
              url: '../../subpages/Reg/vip/vip',
            })
          }

        }
      })
    }
    //<!--会员  -->
    if (ticketType == 'vip'){
      wx.request({
        url: serverURL + '/mainuserInfo/selectVip',
        data: {
          phone: this.data.phone,
          token: openid
        },
        success: function (res) {
          if (res.data.msg == "已存在") {
            wx.navigateTo({

              url: '../../subpages/Reg/sure/sure',
            })
          } else if (res.data.msg == "不存在") {
            wx.navigateTo({
              url: '../../subpages/Reg/vip/vip',
            })
          }

        }
      })
    }
    //学生
    if (ticketType =='stu'){
      wx.request({
        url: serverURL + '/mainuserInfo/selectStu',
        data: {
          phone: this.data.phone,
          token: openid
        },
        success: function (res) {
          if (res.data.msg == "已存在") {
            wx.navigateTo({

              url: '../../subpages/Reg/sure/sure',
            })
          } else if (res.data.msg == "不存在") {
            wx.navigateTo({
              url: '../../subpages/Reg/vip/vip',
            })
          }

        }
      })
    }
    //媒体
    if (ticketType == 'madia'){
      wx.request({
        url: serverURL + '/mainuserInfo/selectmedia',
        data: {
          phone: this.data.phone,
          token: openid
        },
        success: function (res) {
          if (res.data.msg == "已存在") {
            if (res.data.data[0].media_status == "1") {
              wx.navigateTo({
                url: '../../subpages/Reg/check/check',
              })
            }else{
              wx.navigateTo({
                url: '../../subpages/Reg/sure/sure',
              })
            }
          } else if (res.data.msg == "不存在") {
            wx.navigateTo({
              url: '../../subpages/Reg/vip/vip',
            })
          }

        }
      })
    }
    //嘉宾
    if (ticketType == 'gust') {
      wx.request({
        url: serverURL + '/mainuserInfo/selectnoVip',
        data: {
          phone: this.data.phone,
          token: openid
        },
        success: function (res) {
          if (res.data.msg == "已存在" ) {
            if (res.data.data[0] && res.data.data[0].noVip_status == "1") {
              wx.navigateTo({
                url: '../../subpages/Reg/check/check',
              })
            }else{
              wx.navigateTo({
                url: '../../subpages/Reg/sure/sure',
              })
            }

          } else if (res.data.msg == "不存在") {
            wx.navigateTo({
              url: '../../subpages/Reg/vip/vip',
            })
          }

        }
      })
    }
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'wxphone',
      success: function (res) {
        that.setData({
          phone: res.data
        })
      }
    })
    wx.request({
      url: serverURL + '/sticket/wxsticket',
      data: {
        token: app.globalData.token,
      },
      success: function (res) {
        that.setData({
          list: res.data
        })
      }, fail: function (res) {
      }
    })
 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})