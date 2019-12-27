// pages/mine/goodsOrder/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: {
      linkName: '张三',
      linkPhone: '18611111111',
      linkAddress: '测试地址测试地址测试地址测试地址测试地址测试地址测试地址测试地址',
      goodsItem: [
        {
          id: 1,
          drugName: '优乐益生菌250幼犬、幼猫必选必买哈哈哈哈优乐益生菌250幼犬优乐益生菌250幼犬、幼猫必选必买哈哈哈哈优乐益生菌250幼犬',
          drugImage: '../../../image/1.jpg',
          drugPrice: '13.00',
          drugNum: 1
        },
        {
          id: 1,
          drugName: '优乐益生菌250幼犬、幼猫必选必买哈哈哈哈优乐益生菌250幼犬优乐益生菌250幼犬、幼猫必选必买哈哈哈哈优乐益生菌250幼犬',
          drugImage: '../../../image/2.jpg',
          drugPrice: '13.00',
          drugNum: 1
        },
      ],
      freight: 10,
      goodsNum: 3,
      totalPrice: '232.00'

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