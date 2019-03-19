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
    wxphone: "",
    smsphone: "",
    proName: '',
    proPrice: '',
    proInstructions: '',
    proDetails: '',
    proImage: '',
    proThumimage: '',
    num: '1',
    minusStatus: 'disabled',
    totalMoney: 0,
    sence: "",
    collected: false,
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    var price = this.data.proPrice;
    var total = this.data.totalMoney;

    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    total = (num * 10) * (price * 10);
    total = total / 100;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus,
      totalMoney: total
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    var price = this.data.proPrice;
    var total = this.data.totalMoney;
    // 不作过多考虑自增1  
    num++;
    total = (num * 10) * (price * 10);
    total = total / 100;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus,
      totalMoney: total
    });
  },
  /*购物车多选*/
  onSelextTap: function (e) {
    if (this.data.collected){
      this.setData(
        {
          collected:false
        });
    }else{
      this.setData(
        {
          collected: true
        });
    }
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },
  /*金额合计 */
  bindTotal: function (e) {
    var total = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      tolnum: total
    });
  },
  // 支付方法
  pay: function () {
    var self = this;
    var phone = self.data.wxphone;

    var openid = app.globalData.token;
    var total = self.data.totalMoney;
    var sence = self.data.sence;
    console.log(sence)
    wx.request({
      url: serverURL + '/wxPay/wx_pay',
      data: {
        openid: openid,
        title: self.data.proName,
        price: total,
        phoneNum: phone
      },
      header: { 'content-type': 'application/json' },
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
        } else if (res.data.status == "102") {
          wx.showModal({
            title: '提示',
            content: "服务器错误",
          })
        } else if (res.data.status == 100) {
          var payModel = res.data;
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
                complete: function () {
                  wx.redirectTo({
                    url: '../../News/News'
                  })
                }
              })
            },
            'fail': function (res) {
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
    var name = wx.getStorageSync('name');
    var price = wx.getStorageSync('price');
    var Instructions = wx.getStorageSync('Instructions');
    var details = wx.getStorageSync('details');
    var image = wx.getStorageSync('image');
    var thumimage = wx.getStorageSync('thumimage');
    self.setData({
      proName: name,
      proPrice: price,
      proInstructions: Instructions,
      proDetails: details,
      proImage: image,
      proThumimage: thumimage,
      totalMoney: price
    })
  },

  onShow: function () {
    var self = this;
    wx.getStorage({
      key: 'wxphone',
      success: function (res) {
        self.setData({
          wxphone: res.data
        })
      }
    }),
      wx.getStorage({
        key: 'sence',
        success: function (res) {
          self.setData({
            sence: res.data
          })
        },
      })
  }
})