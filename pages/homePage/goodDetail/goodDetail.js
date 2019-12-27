// pages/homePage/goodDetail/goodDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isNotAdd: true,
    isShowPoint: false,
    isAddShoppingCart: false,
    detailImg: [
      "../../image/g1.jpeg",
      "../../image/g2.jpeg",
      "../../image/g3.jpeg",
    ],
    chooseSize: false,
    animationData: {},
    maskAnimationData:{},
    goodNum: 1,
  },

  tapShoppingCart: function () {
    wx.switchTab({
      url: '../../shoppingCart/shoppingCart',
    })
  },

  tapCart: function (e) {
    this.setData({
      isAddShoppingCart: true,
    })
    var maskAnimation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease-in'
    })
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-in'
    })
    //起始状态
    maskAnimation.opacity(0).step();
    animation.translateY(420).step()
    this.setData({
      maskAnimationData: maskAnimation.export(),
      animationData: animation.export(),
      chooseSize: true
    });
    setTimeout(() => {
      //终止状态
      maskAnimation.opacity(1).step();
      animation.translateY(0).step()
      this.setData({
        maskAnimationData: maskAnimation.export(),
        animationData: animation.export(),
      })
    }, 10);
  },

  hideModal: function (e) {
    var maskAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in'
    })
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in'
    })
    //起始状态
    maskAnimation.opacity(1).step();
    animation.translateY(0).step()
    this.setData({
      maskAnimationData: maskAnimation.export(),
      animationData: animation.export(),
    });
    setTimeout(() => {
      //终止状态
      maskAnimation.opacity(0).step();
      animation.translateY(400).step()
      this.setData({
        maskAnimationData: maskAnimation.export(),
        animationData: animation.export(),
      })
    }, 200);
    setTimeout(() => {
      //终止状态
      this.setData({
        chooseSize: false,
        goodNum: 1
      })
    }, 500);
  },

  tapGoBuy: function () {
    this.tapCart();
    this.setData({
      isAddShoppingCart: false,
    })
  },

  numReducet: function () {
    var that = this;
    var goodNum = that.data.goodNum;
    if (goodNum == 1) {
      that.setData({
        isNotAdd: true
      })
    }
    else {
      that.setData({
        isNotAdd: false,
        goodNum: goodNum - 1
      })
    }
  },

  numAdd: function () {
    var that = this;
    var goodNum = that.data.goodNum;
    that.setData({
      goodNum: goodNum + 1,
    })
  },

  tapSubmit: function () {
    var that = this;
    that.hideModal();
    if (that.data.isAddShoppingCart == true) {
      wx.showToast({
        title: '成功添加到购物车',
      })
    }
    else {
      //确认订单
      wx.navigateTo({
        url: '../createOrder/createOrder',
      })
    }
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
      title: '商品详情',
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