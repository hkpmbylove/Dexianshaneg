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
    name:"",
    phone:"",
    email:"",
    util:"",
    job:""
  },

  formSubmit: function (e) {
    var name = e.detail.value.name;
    // realname
    var phone = e.detail.value.phone;
    // mobile
    var email = e.detail.value.email;
    var util = e.detail.value.util;
    var job = e.detail.value.job;
    if (name == "" || phone == "" || email == "" || util == "" || job == "") {
      wx.showModal({
        title: '提示',
        content: '请输入完整信息！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      var openid = app.globalData.token;
      wx.request({
        url: serverURL + '/mainuserInfo/noVip',
        data: {
          name: name,
          phone: phone,
          email: email,
          util: util,
          job: job,
          token: openid
        }, success: function (res) {
       //   wx.removeStorage({ key: 'wxphone' })
//          console.log(res.data)
        }
      })
      // detail
    }
  },
  loginBtnClick: function () {
    if (this.data.name.length == 0 || this.data.phone.length == 0) {
      this.setData({
        infoMess: '温馨提示：用户名和密码不能为空！',
      })
    } else {
      this.setData({
        infoMess: '',
        name: '用户名：' + this.data.userN,
        phone: '密码：' + this.data.passW
      })
    }
  },

  // 手机号部分
  inputPhoneNum: function (e) {
    let phoneNumber = e.detail.value
    if (phoneNumber.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNumber)
    }
  },
  checkPhoneNum: function (phoneNumber) {
    let str = /^1\d{10}$/
    if (str.test(phoneNumber)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        image: './../../../../images/fail.png'
      })
      return false
    }
  },
  // 邮箱验证部分
  inputemail: function (e) {
    let email = e.detail.value
    let checkedNum = this.checkEmail(email)
  },
  checkEmail: function (email) {
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (str.test(email)) {
      return true
    } else {
      wx.showToast({
        title: '请填写正确的邮箱号',
        image: './../../../../images/fail.png'
      })
      return false
    }
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
    var self = this;
    wx.getStorage({
      key: 'wxphone',
      success: function (res) {
        self.setData({
          phone: res.data
        })
//        console.log("微信手机号：" + res.data)
      }
    })
  },

})