// pages/mine/address/editAddr/editAddr.js
var app = getApp();
var common = require('../../../../utils/common.js');
//提交数据
var uploadData = function(that) {
  //新增
  if (!that.data.isEdit) {
    if (that.data.name != '' && that.data.phone != '' && that.data.addr != '') {
      if (that.data.phone.length == 11) {
        var params = {
          skey: wx.getStorageSync('skey'),
          rId: wx.getStorageSync('userId'),
          type: 1,
          rName: that.data.name,
          rPhone: that.data.phone,
          rAddress: that.data.addr,
          state: that.data.isDefault,
          label: '_'
        };
        common.ajax_post('weiXin/address/addAddress', params, function(res) {
          wx.showToast({
            title: '提交成功',
          });
          setTimeout(function() {
            wx.navigateBack({})
          }, 1000)
        }, function(fail) {})
      } else {
        wx.showToast({
          title: '请确认手机号位数',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '请补全信息',
        icon: 'none'
      })
    }
  }
  //编辑
  else {
    if (that.data.name != '' && that.data.phone != '' && that.data.addr != '') {
      if (that.data.phone.length == 11) {
        var params = {
          skey: wx.getStorageSync('skey'),
          rId: wx.getStorageSync('userId'),
          type: 1,
          rName: that.data.name,
          rPhone: that.data.phone,
          rAddress: that.data.addr,
          state: that.data.isDefault,
          label: '_',
          addressId: that.data.addrid
        };
        console.log();
        common.ajax_post('weiXin/address/updateAddress', params, function(res) {
          wx.showToast({
            title: '提交成功',
          });
          setTimeout(function() {
            wx.navigateBack({})
          }, 1000)
        }, function(fail) {
          console.log();
        })
      } else {
        wx.showToast({
          title: '请确认手机号位数',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '请补全信息',
        icon: 'none'
      })
    }
  }
}

var deleteAddr = function(that) {
  var params = {
    addressId: that.data.addrid
  };
  common.ajax_post('weiXin/address/deleteAddress', params, function(res) {
    wx.showToast({
      title: '删除成功',
    });
    setTimeout(function() {
      wx.navigateBack({})
    }, 1000)
  }, function(fail) {
    console.log(fail);
  })
}


Page({
  /**
   * 页面的初始数据
   */
  data: {
    isEdit: 0,
    name: '',
    phone: '',
    addr: '',
    isDefault: 0,
    addrid: 0,
    hiddenDefault: 0
  },

  //订单详情
  bindSubmit: common.throttle(function(e) {
    var that = this;
    uploadData(that);
  }, 1000),

  bindName: function(e) {
    this.data.name = e.detail.value;
  },

  bindPhone: function(e) {
    this.data.phone = e.detail.value;
  },

  bindAddr: function(e) {
    this.setData({
      addr: e.detail.value
    })
  },

  switch2Change: function(e) {
    var that = this;
    if (e.detail.value) {
      that.setData({
        isDefault: 1
      })
    } else {
      that.setData({
        isDefault: 0
      })
    }
  },

  tapDelete: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除该地址吗？',
      success: function(res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          deleteAddr(that);
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var isEdit = options.isEdit;
    if (isEdit != undefined) {
      that.setData({
        name: options.name,
        phone: options.phone,
        addr: options.addr,
        addrid: options.addrid,
        isEdit: options.isEdit,
        isDefault: parseInt(options.state),
        hiddenDefault: parseInt(options.state), //根据编辑点击，默认就隐藏
      })
    } else if (that.data.isEdit == 0) {
      //根据新增，不隐藏
      that.setData({
        hiddenDefault: 0,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})