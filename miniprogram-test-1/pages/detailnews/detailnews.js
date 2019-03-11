import host from '../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({
  data: {
    title: '',
    original:''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var self = this;
    var url = wx.getStorageSync('original');
    self.setData({
      original: url,
    })
  },
  onShow: function () {}
  
})