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
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    IntroductionInfo:"",
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
  
    items: [
      { name: 'company', value: '公司抬头', checked: 'true' },
      { name: 'person', value: '个人抬头' },
    ],
    kind: "company",
    rise: "",
    id: "",
    content: "",
    remarks: "",
    detail: "",
    phone: "",
    address: "",
    wxphone: "",
    prices:""
  },
  radioChange: function (e) {
    var self=this;
    var kind = e.detail.value;
    self.setData({
      kind:kind
    })
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
  showadd: function () {
    wx.navigateTo({
      url: '../instruction/instruction',
    })
  },
  formSubmit: function (a) {
    var self=this;
    var Identityinfo = {};
    Identityinfo.Identity = self.data.wxphone;
    Identityinfo.type = self.data.kind;
    Identityinfo.head = a.detail.value.rise;
    Identityinfo.rec = a.detail.value.id;
    Identityinfo.content = a.detail.value.content;
    Identityinfo.amount = self.data.prices;//钱数
    Identityinfo.info = a.detail.value.remarks;
    Identityinfo.recipient = a.detail.value.detail;
    Identityinfo.phoneNum = a.detail.value.phone;
    Identityinfo.address = a.detail.value.address;
    if (Identityinfo.type == "" || Identityinfo.head == "" || Identityinfo.rec == "" || Identityinfo.content == "" || Identityinfo.amount == "" || Identityinfo.info == "" || Identityinfo.recipient == "" || Identityinfo.phoneNum == "" || Identityinfo.address =="" ){
      wx.showModal({
        title: '提示',
        content: '请输入完整的信息',
      })
    }else{
      wx.request({
        url: serverURL + '/invoice/add',
        data: {
          token: app.globalData.token,
          Identityinfo: Identityinfo
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
          } else if (res.data == "err_1") {
            wx.showModal({
              title: '提示',
              content: "您还有未受理的发票",
            })
          } else {
            wx.showModal({
              title: '提示',
              content: "提交成功",
            })
          }
        }
      })
    }


  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this;
    wx.getStorage({
      key: 'wxphone',
      success: function (res) {
        self.setData({
          wxphone: res.data,
        })
        wx.request({
          url: serverURL + '/orders/wxorders',
          data: {
            token: app.globalData.token,
            phone: self.data.wxphone
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
              var orderlist = res.data;
              var arr = [];
              var  prices=null;
              for (var obj of orderlist) {
                
                prices += obj.order_total;
              }
              self.setData({
                prices: prices.toFixed(2)
              })

            }
          }, fail: function (res) {
          }
        })
      }
    })

  }
})