// pages/homePage/createOrder/createOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '张三',
    phone: '18611111111',
    addr: '测试地址测试地址测试地址测试地址测试地址测试地址测试地址测试地址测试地址',
    goods: [
      {
        id: 1,
        goodsName: '优乐益生菌250幼犬、幼猫必选必买关爱宠物健康优乐益生菌250幼犬、幼猫必选必买关爱宠物健康优乐益生菌250幼犬、幼猫必选必买关爱宠物健康',
        goodsPrice: '36.00',
        goodsNum: 3,
        url: '../../image/1.jpg'
      },
      {
        id: 1,
        goodsName: '优乐益生菌250幼犬、幼猫必选必买关爱宠物健康',
        goodsPrice: '36.00',
        goodsNum: 3,
        url: '../../image/1.jpg'
      },
      {
        id: 1,
        goodsName: '优乐益生菌250幼犬、幼猫必选必买关爱宠物健康',
        goodsPrice: '36.00',
        goodsNum: 3,
        url: '../../image/1.jpg'
      },
    ],
    roadPrice: '10.00',
    total: '120.00'
  },

  toOrder: function () {
    wx.showToast({
      title: '支付成功',
    })
    setTimeout(function (){
      wx.navigateBack({
        delta: 3
      })
    }, 1500)
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
      title: '确认订单',
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