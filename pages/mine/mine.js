// pages/mine/mine.js
const app = getApp()
var common = require('../../utils/common.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    avatarUrl: '../image/mine/head.png',
    nickName: '',
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  //授权登录
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
  
  //绑定手机号
  getPhoneNumber: common.throttle(function (e) {
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { } else {
      var date = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        openId: wx.getStorageSync('openId'),
      }
      common.ajax_post('weiXin/user/getUserPhone', date, function (res) {
        wx.setStorageSync('wxPhone', res.data.wxPhone);
        var phone = res.data.wxPhone;
        that.setData({
          phone: phone
        })
      }, function (fail) {
        //保存失败
        wx.showToast({
          title: '绑定失败！',
          icon: 'none'
        })
      })
    }
  }, 1000),

  tapMember: function () {
    wx.navigateTo({
      url: 'member/member',
    })
  },

  tapCoupon: function () {
    wx.navigateTo({
      url: 'coupon/coupon',
    })
  },

  tapAddress: function () {
    wx.navigateTo({
      url: 'address/address',
    })
  },

  tapOrderList: function () {
    wx.navigateTo({
      url: 'goodsOrder/goodsOrder',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({//设置导航栏颜色
      frontColor: '#000000',//注意frontColor的值只能为000000或者111111
      backgroundColor: "#fff",
    });
    wx.setNavigationBarTitle({
      title: '我的',
    });
    // this.setData({
    //   avatarUrl: wx.getStorageSync('avatarUrl'),
    //   nickName: wx.getStorageSync('nickname'),
    //   phone: wx.getStorageSync('wxPhone')
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