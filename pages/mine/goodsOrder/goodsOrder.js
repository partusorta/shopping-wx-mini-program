// pages/mine/goodsOrder/goodsOrder.js
var app = getApp();
var common = require('../../../utils/common.js');
var page = 1;
var pageSize = 10;
var loadData = function (that) {
  var data = {
    skey: wx.getStorageSync('skey'),
    status: that.data.state,
    page: page,
    pageSize: pageSize,
    uId: wx.getStorageSync('userId')
  }
  common.ajax_post('weiXin/goods/getUserOrderStatus', data, function (res) {
    if (page == 1) {
      that.setData({
        orderList: [],
      })
    }
    if (res.data == '') {
      if (page == 1) {
        that.setData({
          isShow: true,
        })
      } else {
        that.setData({
          isShow: false,
        })
        wx.showToast({
          title: '到底了！',
          icon: 'none'
        })
      }
    } else {
      var arr = that.data.orderList;
      arr = arr.concat(res.data);
      that.setData({
        orderList: arr,
        isShow: false,
      })
      wx.stopPullDownRefresh();
    }
  }, function (fail) {
    wx.showToast({
      title: '获取失败',
      icon: 'none'
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    screenWidth: wx.getSystemInfoSync().windowWidth,
    state: 0,
    orderList: [
      {
        id:1,
        goodsItems:[
          {
            id: 1,
            drugImage: '../../image/1.jpg'
          },
          {
            id: 1,
            drugImage: '../../image/2.jpg'
          },
        ]
      },
      {
        id: 1,
        goodsItems: [
          {
            id: 1,
            drugImage: '../../image/3.jpg'
          },
          {
            id: 1,
            drugImage: '../../image/2.jpg'
          },
        ]
      },
      {
        id: 1,
        goodsItems: [
          {
            id: 1,
            drugImage: '../../image/1.jpg'
          },
        ]
      },
    ],
    isShow: false,
    animationData: {},
    begin: 0,
    end: 0,
    scrollLeft: 0,
  },
  tapStatus: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      state: parseInt(index)
    })
    var begin = 0;
    var end = 0;
    switch (parseInt(index)) {
      case 0:
        begin = 0;
        end = 0;
        break;
      case 1:
        this.setData({
          scrollLeft: -0.25 * this.data.screenWidth,
        })
        begin = 0;
        end = 0.25 * this.data.screenWidth;
        break;
      case 2:
        begin = 110;
        end = 0.5 * this.data.screenWidth;
        break;
      case 3:
        this.setData({
          scrollLeft: 0.25 * this.data.screenWidth,
        })
        begin = 220;
        end = 0.75 * this.data.screenWidth;
        break;
      case 4:
        begin = 330;
        end = this.data.screenWidth;
        break;
    }
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-in'
    })
    //起始状态
    animation.translateX(begin).step()
    this.setData({
      animationData: animation.export(),
    });
    setTimeout(() => {
      //终止状态
      animation.translateX(end).step()
      this.setData({
        animationData: animation.export(),
      })
    }, 10);

  },
  //标题切换
  bindBar: function (e) {
    var that = this;
    var state = e.currentTarget.dataset.state;
    that.setData({
      state: parseInt(state)
    })
    page = 1;
    loadData(this);
  },
  //确认收货
  bindGet: common.throttle(function (e) {
    var index = e.currentTarget.dataset.index;
    var that = this;
    wx.showModal({
      title: '确认收货提示',
      content: '是否确认收货？',
      success: function (res) {
        if (!res.cancel) {
          console.log("确认收货了")
          //进行收货操作
          var data = {
            orderId: that.data.orderList[index].oid
          }
          console.log("收货参数" + JSON.stringify(data));
          common.ajax_post('weiXin/product/tecReceipt', data, function (res) {
            console.log("收货返回" + JSON.stringify(res))
            wx.showToast({
              title: '收货成功',
            })
            page = 1;
            loadData(that);
          }, function (fail) {
            wx.showToast({
              title: '收货失败',
              icon: 'none'
            })
          })
        }
      }
    })
  }, 1000),
  //订单详情
  bindOrderDetail: common.throttle(function (e) {
    var type = e.currentTarget.dataset.type;
    var orderId = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    app.globalData.orderGoods = this.data.orderList[index];
    // url: '../orderDetail/orderDetail?orderId=' + orderId + '&type=' + type
    wx.navigateTo({
      url: 'orderDetail/orderDetail'
    })
  }, 1000),

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
    // loadData(this);
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
    page = 1;
    loadData(this);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    page = page + 1;
    loadData(this);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})