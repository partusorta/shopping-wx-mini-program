// pages/shoppingCart/shoppingCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAllSelect: false,
    total: 0,
    selectList:[],
    goods: [
      {
        id: 1,
        goodsName: '优乐益生菌250幼犬、幼猫必选必买关爱宠物健康优乐益生菌250幼犬、幼猫必选必买关爱宠物健康优乐益生菌250幼犬、幼猫必选必买关爱宠物健康',
        goodsPrice: '36.00',
        goodsNum: 3,
        url: '../image/1.jpg'
      },
      {
        id: 1,
        goodsName: '优乐益生菌250幼犬、幼猫必选必买关爱宠物健康',
        goodsPrice: '36.00',
        goodsNum: 3,
        url: '../image/1.jpg'
      },
      {
        id: 1,
        goodsName: '优乐益生菌250幼犬、幼猫必选必买关爱宠物健康',
        goodsPrice: '36.00',
        goodsNum: 3,
        url: '../image/1.jpg'
      },
    ],
  },
  toOrder: function () {
    wx.navigateTo({
      url: '../homePage/createOrder/createOrder',
    })
  },

  tapSelect: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.selectList;
    //点击选中或反选
    if (list[index] == 0) {
      list[index] = 1;
    }
    else {
      list[index] = 0;
    }
    this.setData({
      selectList: list
    })
    //判断是否为全选或全不选
    var j = 0; var k = 0;
    for (var i = 0; i < list.length; i++) {
      if (list[i] == 0) {
        this.setData({
          isAllSelect: false,
        })
      } else {
        k++
      }
    }
    // if (j < list.length) {
    //   this.setData({
    //     isAllSelect: false,
    //   })
    // }
    // else 
    if (k == list.length){
      this.setData({
        isAllSelect: true,
      })
    }
  },

  numAdd: function (e) {
    
  },

  numReducet: function (e) {

  },

  tapAllSelect: function () {
    if (this.data.isAllSelect) {
      this.setData({
        isAllSelect: false,
        selectList: [0, 0, 0]
      })
    }
    else {
      this.setData({
        isAllSelect: true,
        selectList: [1, 1, 1]
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
      title: '购物车',
    });
    var list = this.data.selectList;
    for (var i = 0; i < this.data.goods.length; i++) {
      list.push(0);
    }
    console.log (list);
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