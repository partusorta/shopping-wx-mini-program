// pages/mine/address/address.js
var app = getApp()
var common = require('../../../utils/common.js')
var loadData = function (that) {
  that.setData({
    dataList: [],
    // isShow: false,
  })
  var params = {
    skey: wx.getStorageSync('skey'),
    uId: wx.getStorageSync('userId'),
  };
  common.ajax_post('weiXin/address/getAddress', params, function (res) {
    var dataList = res.data;
    if (dataList.length > 0) {
      that.setData({
        dataList: dataList,
      })
    }
    else {
      that.setData({
        isShow: true,
      })
      app.globalData.selectName = '';
      app.globalData.selectAddr = '';
      app.globalData.selectPhone = '';
      app.globalData.selectAddrId = 0;
    }
  }, function (fail) {
    that.setData({
      isShow: true,
    })
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    source: 0, //上一页是订单页面为1
    isShow: true,
    dataList: [],
    name: '',
    phone: '',
    addr: '',
    addrid: 0
  },

  tapAdd: common.throttle(function () {
    var that = this;
    wx.navigateTo({
      url: 'editAddr/editAddr',
    })
  }, 1000),

  tapEdit: common.throttle(function (e) {
    var name = e.currentTarget.dataset.name;
    var phone = e.currentTarget.dataset.phone;
    var addr = e.currentTarget.dataset.addr;
    var addrid = e.currentTarget.dataset.addrid;
    var state = e.currentTarget.dataset.state;
    wx.navigateTo({
      url: 'editAddr/editAddr?addrid=' + addrid + "&name=" + name + "&phone=" + phone + "&addr=" + addr + "&isEdit=" + 1 + "&state=" + state,
    })
  }, 1000),


  tapIndex: common.throttle(function (e) {
    if (this.data.source) {
      app.globalData.selectName = e.currentTarget.dataset.name;
      app.globalData.selectAddr = e.currentTarget.dataset.addr;
      app.globalData.selectPhone = e.currentTarget.dataset.phone;
      app.globalData.selectAddrId = e.currentTarget.dataset.addrid;
      wx.navigateBack({
      })
    }
  }, 1000),

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({//设置导航栏颜色
      frontColor: '#000000',//注意frontColor的值只能为000000或者111111
      backgroundColor: "#fff",
    });
    wx.setNavigationBarTitle({
      title: '收货地址',
    });
    if (options.source != undefined) {
      this.setData({
        source: options.source
      })
    }
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
    var that = this;
    // loadData(that);
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
    // var that = this
    // var pages = getCurrentPages();
    // var currPage = pages[pages.length - 1];   //当前页面
    // var prevPage = pages[pages.length - 2];  //上一个页面

    // prevPage.setData({
    //   name: that.data.name,
    //   phone: that.data.phone,
    //   addr: that.data.addr,
    //   addressId: that.data.addrid,
    // });
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