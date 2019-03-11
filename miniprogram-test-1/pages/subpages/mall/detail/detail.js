import host from '../../../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({
  data: {
    title: '',
    proName: '',
    proPrice: '',
    proInstructions: '',
    proDetails: '',
    proImage:'',
    thumimage:''
  },
  onLoad: function (options) {
    var self = this;
    var name = wx.getStorageSync('name');
    var price = wx.getStorageSync('price');
    var Instructions = wx.getStorageSync('Instructions');
    var details = wx.getStorageSync('details');
    var image = wx.getStorageSync('image');
    var thumimage = wx.getStorageSync('thumimage');
    wx.setStorageSync('thumimage', thumimage);
    self.setData({
      proName: name,
      proPrice: price,
      proInstructions: Instructions,
      proDetails: details,
      proImage: image,
    })
    
  },
  buybutton: function () {
    wx.navigateTo({
      url: '../buy/buy',
    })
  },
  onShow: function () {
    
  }
})