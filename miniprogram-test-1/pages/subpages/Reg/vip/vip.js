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
    ticketTitle:null,
    ticketContent:null,
    ticketId:null,
    ticketPrice:null,
    ticketType:null,
    ticketMark:null,
 //   ticketName:null,
    name:"",
    phone:"",
    email:"",
    company:"",
    job:"",
    vip:""
  },
  formSubmit4: function (e) {
    var openid = app.globalData.token;
    var name = e.detail.value.name;
    // realname
    var phone = e.detail.value.phone;
    // mobile
    var email = e.detail.value.email;
    var company = e.detail.value.company;
    var job = e.detail.value.job;
   
  
    if (name == "" || phone == "" || email == "" || company == "" || job == "") {
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
      wx.request({
        url: serverURL + '/mainuserInfo/noVip',
        data: {
          name: name,
          phone: phone,
          email: email,
          util: company,
          job: job,
          mark: this.data.ticketMark,
          token: openid
        }, success: function (res) {
          if(res.data.msg=="SUCCESS"){
                wx.navigateTo({
                  url: '../sure/sure',
                 })
          }
        }
      })
      //  console.log(e.detail.value)
      // detail
    }
  },
  //会员接口
  formSubmitVip: function (e) {
    var openid = app.globalData.token;
    var name = e.detail.value.name;
    // realname
    var phone = e.detail.value.phone;
    // mobile
    var email = e.detail.value.email;
    var company = e.detail.value.company;
    var job = e.detail.value.job;
    var vip = e.detail.value.vip;
 

    if (name == "" || phone == "" || email == "" || company == "" || job == "" || vip == "") {
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
      wx.request({
        url: serverURL + '/mainuserInfo/Vip',
        data: {
          tickedId: this.data.ticketId,
          name: name,
          phone: phone,
          email: email,
          util: company,
          job: job,
          VipNum: vip,
          mark: this.data.ticketMark,
          token: openid
        }, success: function (res) {
//          console.log(res.data);
          if (res.data.msg == "SUCCESS") {
            wx.navigateTo({
              url: '../sure/sure',
            })
          }
        }
      })
      //  console.log(e.detail.value)
      // detail
    }
  },
  //媒体接口
  formSubmitMadia: function (e) {
    var openid = app.globalData.token;
    var name = e.detail.value.name;
    // realname
    var phone = e.detail.value.phone;
    // mobile
    var email = e.detail.value.email;
    var company = e.detail.value.company;
    var job = e.detail.value.job;
    var mediaName = e.detail.value.mediaName;


    if (name == "" || phone == "" || email == "" || company == "" || job == "" || mediaName == "") {
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
      wx.request({
        url: serverURL + '/mainuserInfo/media',
        data: {
          tickedId: this.data.ticketId,
          name: name,
          phone: phone,
          email: email,
          util: company,
          job: job,
          platform: mediaName,
          mark: this.data.ticketMark,
          token: openid
        }, success: function (res) {
//          console.log(res.data);
          if (res.data.msg == "SUCCESS") {
            wx.navigateTo({
              url: '../sure/sure',
            })
          }
        }
      })
      //  console.log(e.detail.value)
      // detail
    }
  },
  //学生接口
  formSubmitStu: function (e) {
    var openid = app.globalData.token;
    var name = e.detail.value.name;
    // realname
    var phone = e.detail.value.phone;
    // mobile
    var email = e.detail.value.email;
    var school = e.detail.value.schoolName;
    var stunum = e.detail.value.stuNum;


    if (name == "" || phone == "" || email == "" || school == "" || stunum == "") {
      wx.showModal({
        title: '提示',
        content: '请输入完整信息！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            if (res.data.msg == "SUCCESS") {
              wx.navigateTo({
                url: '../sure/sure',
              })
            }
          }
        }
      })
    } else {
      wx.request({
        url: serverURL + '/mainuserInfo/Stu',
        data: {
          tickedId: this.data.ticketId,
          name: name,
          phone: phone,
          email: email,
          school: school,
          stuNum: stunum,
          mark: this.data.ticketMark,
          token: openid
        }, success: function (res) {
//          console.log(res.data)
          if (res.data.msg == "SUCCESS") {
            wx.navigateTo({
              url: '../sure/sure',
            })
          }
        }
      })
      //  console.log(e.detail.value)
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
    var self = this;
    //  console.log(options);
      var title = wx.getStorageSync('ticketTitle');
      var price = wx.getStorageSync('ticketPrice');
      var content = wx.getStorageSync('ticketContent');
      var ticketMark = wx.getStorageSync('ticketMark');
      var Type = wx.getStorageSync('ticketType');
      var ticketId1 = wx.getStorageSync('ticketId');
    //  var ticketName = wx.getStorageSync('ticketName');
      console.log(title + price + content);
      self.setData({
        ticketTitle:title,
        ticketPrice:price,
        ticketContent: content,
        ticketMark: ticketMark,
        ticketType: Type,
        ticketId: ticketId1,
      //  ticketName: ticketName
      })
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
      //  console.log("微信手机号：" + res.data)
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