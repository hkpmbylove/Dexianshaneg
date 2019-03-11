// pages/Schedule/Schedule.js
import host from '../../../../host/host';
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
    wxphone:"",
    smsphone:"",
    ticketTitle:null,
    ticketPrice:null,
    ticketName:null
  },
  onLoad: function () {
   
  },

  onShow:function(){
   
   
  }
})