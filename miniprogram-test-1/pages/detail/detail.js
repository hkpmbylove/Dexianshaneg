import host from '../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({
  data: {
    title: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(JSON.stringify(options))
    this.setData({
      title: options.title
    })
  },
  onShow: function () {
//     var self = this;
//     wx.request({
//       url: serverURL + '/index/mettinginfo',
//       data: {
//         token: app.globalData.token,
//       },
//       success: function (res) {
// //        console.log(res.data);
//         if (res.data == "err") {
//           wx.showModal({
//             title: '提示',
//             content: '登陆过期',
//             complete: function () {
//               wx.redirectTo({
//                 url: '/pages/login/login',
//                 success: function () {
//                   app.login();
//                 }
//               })
//             }
//           })
//         } else if (res.data == "SERVERERR") {
//           wx.showModal({
//             title: '提示',
//             content: "强力推荐列表获取失败",
//           })
//         } else {
// //          console.log(res.data);
//           var myDate = new Date();
//           console.log(res.data.metting_original+ "?" + myDate.getTime())
//           self.setData({

//             metingInfo: res.data 
//           })

//         }
//       }, fail: function (res) {
//         console.log(res)
//       }
//     })

  }
})