
import ajax from '../../../../assets/js/ajax.js'
// pages/order/child/order_detail/order_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_order_info: {},   //要显示的订单详情
    show_flag: false,   //遮罩与支付弹窗显示标记
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNeedShowOrder();
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

  },


  //取得并设置要显示的订单详情
  getNeedShowOrder() {
    let order = wx.getStorageSync('order_detail_show');
    let mallImg_url = getApp().globalData.mallImg_url;
    let obj = {
      o_address: {
        name: (typeof order.orderaddress == 'undefined' ? '' : order.orderaddress.aname),  //收货人的名字
        tel: (typeof order.orderaddress == 'undefined' ? '' : order.orderaddress.aphone),  //收货人的联系电话
        regin: (typeof order.orderaddress == 'undefined' ? '' : order.orderaddress.address)  //收货地址
      },
      o_good_info: {
        img: mallImg_url + order.productId,  //商品对应的图片
        title: order.goodsName,  //商品名字
        price: order.userorder.discountprice,  //商品价格
        time: order.userorder.createtime.substring(0, 10),  //订单生成时间
        pay: order.userorder.ordertotelmoney,  //支付的钱
      },
      o_order_info: {
        pay_way: getPayWei(order.userorder.paytype),  //支付方式
        send_time: (typeof order.userorder.deliveredtime == 'undefined' ? '' : order.userorder.deliveredtime),  //发货时间
        air_way_bill_no: (typeof order.userorder.waybillnum == 'undefined' ? '' : order.userorder.waybillnum),  //运单号
        order_no: order.userorder.orderno, //订单号
        order_status: order.userorder.orderstate  //订单状态
      },
      // pay_user_info: {   //支付是要用的信息
      //   tUserorderid: order.userorder.tUserorderid, //订单id
      //   address_id: order.orderaddress.tOrderaddressid,//地址id
      //   buy_num: order.goodsNum,//购买件数
      //   monney: order.userorder.ordertotelmoney,//支付金额
      //   use_point: (typeof order.userorder.payScore == 'undefined' ? 0 : order.userorder.payScore),//使用的积分
      //   membercouponsid: (typeof order.userorder.membercouponsid == 'undefined' ? '' : order.userorder.membercouponsid)//要优惠券的id
      // }
      thirdorderno: order.userorder.thirdorderno
    };
    this.setData({
      show_order_info: obj
    });
    function getPayWei(paytype) {
      if (typeof paytype != 'undefined') {
        let paytype = undefined;
        switch (paytype) {
          case 1:
            paytype = '分期支付'
            break;
          case 2:
            paytype = '支付宝'
            break;
          case 3:
            paytype = '微信'
            break;
          case 4:
            paytype = '银联'
            break;
          case 5:
            paytype = '积分支付'
            break;
          case 7:
            paytype = '积分+支付宝'
            break;
          case 8:
            paytype = '积分+微信'
            break;
          case 9:
            paytype = '积分+银联'
            break;
        }
        return paytype;
      } else {
        return '';
      }
    }



  },

  //弹出支付方式
  showPayWay() {
    this.setData({
      show_flag: true
    });
    
  },

  //关闭支付弹窗
  closePayWin() {
    this.setData({
      show_flag: false
    });
  },

  //选择微信支付
  choicePay(e) {
    let this_ = this;
    let thirdorderno = this.data.show_order_info.thirdorderno;
    let APP_URL = getApp().globalData.APP_URL;
    let paytype = e.currentTarget.dataset.pay_type;
    wx.showLoading({
      title: '正在支付',
    });
    if (paytype == 10) {//如果是积分+一网通支付
      getCmbSign(thirdorderno, APP_URL + "paytemp.html?type=10");
      //调用第三方支付
    } else if (paytype == 9) {
      doUnionPay(thirdorderno, APP_URL + "paytemp.html?type=9");
    } else if (paytype == 8) {
      this_.doWweixinPay(thirdorderno, APP_URL + 'paytemp.html?type=8');
    }
  },

  //微信支付
  doWweixinPay(thirdOrderNo, returnUrl) {
    let url_root = getApp().globalData.url_root;
    let this_ = this;
    let openid = JSON.parse(wx.getStorageSync('yfsdmember')).wechatid; //openid
    wx.request({
      url: url_root + 'WeixinService/prePay',
      data: {
        returnUrl: returnUrl,
        thirdOrderNo: thirdOrderNo,
        tradeType: "JSAPI",
        openid: openid
      },
      success(res) {
        if (res.statusCode == 200) {
          let data = res.data;
          wx.requestPayment({
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'paySign': data.paySign,
            'success': function (res) {   //调用支付成功回调
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                complete() {
                  this_.setData({
                    show_flag: false,
                    ['show_order_info.o_order_info.order_status']: 2
                  });
                }
              });
            },
            'fail': function () {  //调用失败回调
              wx.showToast({
                title: '支付接口调用失败',
                icon: 'none',
                complete() {
                  this_.setData({
                    show_flag: false,
                  });
                }
              })
            },
            'complete': function () {   //支付接口调用完毕回调

            }
          })

        } else {
          wx.hideLoading();
          wx.showToast({
            title: '微信支付失败',
            icon: 'none',
            complete() {
              this_.setData({
                show_flag: false,
              });
            }
          })
        }
      }
    })
  },

  //确认收货
  sureReceive(){
    wx.showToast({
      title: '收货成功',
    })
  }
})