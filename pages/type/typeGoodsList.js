// pages/type/typeGoodsList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortType: 1,
    sortPrice: 0,
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

  tapAll: function () {
    this.setData({
      sortType: 1,
      sortPrice: 0
    })
  },

  tapSale: function () {
    this.setData({
      sortType: 2,
      sortPrice: 0
    })
  },

  tapPrice: function () {
    this.setData({
      sortType: 3
    })
    if (this.data.sortPrice == 0) {
      this.setData({
        sortPrice: 1
      })
    } else if (this.data.sortPrice == 1) {
      this.setData({
        sortPrice: 2
      })
    }
    else {
      this.setData({
        sortPrice: 1
      })
    }
  },

  tapDetail: function () {
    wx.navigateTo({
      url: '../homePage/goodDetail/goodDetail',
    })
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