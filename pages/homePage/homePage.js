// pages/homePage/homePage.js
const app = getApp()
var common = require('../../utils/common.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      {
        id: 1,
        url: "../image/test.jpg"
      },
      {
        id: 1,
        url: "../image/test.jpg"
      },
      {
        id: 1,
        url: "../image/test.jpg"
      },
    ],
    goodList: [
      {
        id: 1,
        name: "优乐益生菌250幼犬、幼猫必选必买",
        price: "36.00",
        url: "../image/1.jpg"
      },
      {
        id: 2,
        name: "优乐益生菌250幼犬、幼猫必选必买，优乐益生菌250幼犬、幼猫必选必买，优乐益生菌250幼犬、幼猫必选必买，优乐益生菌250幼犬、幼猫必选必买",
        price: "36.00",
        url: "../image/2.jpg"
      },
      {
        id: 3,
        name: "优乐益生菌250幼犬、幼猫必选必买",
        price: "36.00",
        url: "../image/3.jpg"
      },
      {
        id: 4,
        name: "优乐益生菌250幼犬、幼猫必选必买",
        price: "36.00",
        url: "../image/5.jpg"
      }
    ],

  },
  getUserInfo: common.throttle(function (e) {
    var that = this;
    if (e.detail.errMsg == 'getUserInfo:ok') {
      app.globalData.userInfo = e.detail.userInfo
      common.onLogin(0, function (res) { //res 0成功 1解析信息失败 2需要登陆
        if (res == 1) {
          that.setData({
            hasUserInfo: true,
          })
        } else {
          wx.showToast({
            title: '请求超时，请稍后刷新重试',
            icon: 'none'
          })
        }
      }, function (fail) {
        //登录失败
        wx.showToast({
          title: '请求超时，请稍后刷新重试',
          icon: 'none'
        })
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '为了能正常使用，请完成授权！',
        showCancel: false
      })
    }
  }, 1000),

  tapDetail: function () {
    wx.navigateTo({
      url: 'goodDetail/goodDetail',
    })
  },

  tapType: function () {
    wx.navigateTo({
      url: '../type/type',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取信息
      // common.onLogin(1, function (res) {
      //   //status = 0需要授权
      //   if (res == 0) {
      //     that.setData({
      //       hasUserInfo: false,
      //     })
      //   } else {
      //     //status = 1不需要授权
      //     that.setData({
      //       hasUserInfo: true,
      //     })
      //   }
      // })
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