// 获取实例
var app = getApp();
//⽤户登陆
module.exports = {
  onLogin: onLogin,
  ajax_post: ajax_post,
  setStore: setStore,
  convertHtmlToText: convertHtmlToText,
  throttle:throttle
}

//防止多次连续点击
function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime =1000
  }
  let _lastTime = null
  // 返回新的函数
  return function() {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments) //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

function onLogin(type, callback) {
  //1、调⽤微信登录接⼝，获取code
  wx.login({
    success: function (r) {
      var code = r.code; //登录凭证
      if (code) {
        if (type == 1) {
          //2、调⽤获取⽤户信息接⼝
          var formdata = {
            code: code,
          }
          login(formdata, callback);
        } else if (type == 0) {
          wx.getUserInfo({
            success: function (res) {
              var formdata = {
                encryptedData: res.encryptedData,
                iv: res.iv,
                code: code,
              }
              login(formdata, callback);
            },
            fail: function () {
              wx.showToast({
                title: '请求超时，请稍后刷新再试',
                icon: 'none'
              })
            }
          })
        }
      } else {
        wx.showToast({
          title: '请求超时，请稍后刷新再试',
          icon: 'none'
        })
      }
    },
    fail: function () {
      wx.showToast({
        title: '请求超时，请稍后刷新再试',
        icon: 'none'
      })
    }
  })
}

function login(formdata, callback) {
  ajax_post('weiXin/user/userLogin', formdata, function(response) {
    app.globalData.status = response.data.status;
    wx.setStorageSync('openId', response.data.openId);
    wx.setStorageSync('nickname', response.data.nickname);
    wx.setStorageSync('avatarUrl', response.data.avatarUrl);
    wx.setStorageSync('wxPhone', response.data.wxPhone);
    //status == 0 第一次需要授权
    if (response.data.status == "0"){
      callback(0);
    }
    //status == 1 不需要授权
    else {
      callback(1);
    }
  }, function (response) {
    //异常情况
    wx.showToast({
      title: '请求超时，请稍后刷新再试',
      icon: 'none'
    })
  })
}

function setStore(userInfo) {
  app.globalData.userInfo = userInfo;
  wx.setStorageSync('skey', userInfo.skey);
  wx.setStorageSync('userId', userInfo.userId);
  wx.setStorageSync('nickName', userInfo.nickName);
  wx.setStorageSync('avatarUrl', userInfo.avatarUrl);
  wx.setStorageSync('wxPhone', userInfo.phoneNumber);
}

//重新封装ajax
function ajax(model) {
  wx.showLoading({
    title: '正在加载...',
  })
  //拼接url
  model.url = app.globalData.baseUrl + model.url;
  //返回Promise对象
  return new Promise(
    function(resolve) {
      wx.request({
        method: model.method,
        url: model.url,
        data: JSON.stringify(model.data),
        success: (res) => {
          if (res.statusCode == 200) {
            //成功处理
            resolve(res.data);
          } else {
            //错误信息处理
            wx.showToast({
              title: '网络异常，请稍后再试！',
              icon: 'none'
            })
          }
        },
        fail: (res) => {
          wx.showToast({
            title: '网络异常，请稍后再试！',
            icon: 'none'
          })
        }
      })
    }
  )
}

function ajax_post(url, param, successCall, failCall) {
  //判断网络
  wx.getNetworkType({
    success: function(res) {
      // 返回网络类型, 有效值：
      // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
      var networkType = res.networkType
      if (networkType == 'none') {
        wx.showModal({
          title: '提示',
          content: '请连接网络后重试',
          showCancel: false,
          success: function() {
            //判断是否需要返回
          },
        })
      } else {
        ajax({
          method: 'POST',
          url: url,
          data: param
        }).then(response => {
          wx.hideLoading();
          var code = response.code;
          var message = response.message;
          if (response.code == 0) {
            //成功的回调，处理成功后，有数据或者没有数据
            successCall(response);
          } else {
            failCall(response);
          }
        });
      }
    }
  })
}

function convertHtmlToText(inputText) {
  var returnText = "" + inputText;
  returnText = returnText.replace(/<\/div>/ig, '');
  returnText = returnText.replace(/<\/li>/ig, '');
  returnText = returnText.replace(/<li>/ig, '  *  ');
  returnText = returnText.replace(/<\/ul>/ig, '');
  //-- remove BR tags and replace them with line break
  returnText = returnText.replace(/<br\s*[\/]?>/gi, "");

  //-- remove P and A tags but preserve what's inside of them
  returnText = returnText.replace(/<p.*?>/gi, "");
  returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

  //-- remove all inside SCRIPT and STYLE tags
  returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
  returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
  //-- remove all else
  returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

  //-- get rid of more than 2 multiple line breaks:
  returnText = returnText.replace(/(?:(?:|\r|\n)\s*){2,}/gim, "");

  //-- get rid of more than 2 spaces:
  returnText = returnText.replace(/ +(?= )/g, '');

  //-- get rid of html-encoded characters:
  returnText = returnText.replace(/ /gi, " ");
  returnText = returnText.replace(/&/gi, "&");
  returnText = returnText.replace(/"/gi, '"');
  returnText = returnText.replace(/</gi, '<');
  returnText = returnText.replace(/>/gi, '>');
  return returnText;
}