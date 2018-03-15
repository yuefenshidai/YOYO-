
import ajax from '../../../../assets/js/ajax.js'
import check_login from '../../../../assets/js/chekLogin.js'
// pages/mall/child/itemBuye/itemBuye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mall_img_url: '',   //商城图片从服务器获取路径
    // url_root: '',   //
    pro_title: '',  //产品的标题
    pro_img: '',  //产品banner图
    pro_id: '',  //产品的id
    // sku_id: '',  //产品详情id
    // goods_arr: [],  //不同型号的产品数组
    goods_introduce: '', // 产品介绍
    open_choice_type_flag: false,   //型号选择打开与隐藏  true 打开
    show_good: '',   //显示的产品型号
    checkd_num: 0,   //选中的产品
    buy_num: 1,  //购买多少件
    price_now: 0,//选中商品现在售价
    price_before: 0,//选中商品的以前售价
    goods_max: 0,   //库存
    can_use_point: 0,  //可使用的积分
    use_point: 0,  //要使用积分的数量
    ueser_address: {
      name: '',  //收件人的姓名
      address: '',  //详细地址
      region: '',  //地区
      tel: '', //收件人点话
      address_id: ''  //地址id
    },
    show_flag: false,   //遮罩与支付弹窗显示标记
    order_info: '',   //点单信息
    membercoupons: { //优惠券
      id: ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    check_login.check();
    let app_goldble_data = getApp().globalData;
    let this_ = this;
    this.data.mall_img_url = app_goldble_data.mallImg_url;
    this.data.url_root = app_goldble_data.url_root;
    this.setData({
      mall_img_url: app_goldble_data.mallImg_url
    }, function () {
      this_.getAddress();
      this_.getPoint();
      this_.initialOrderData(wx.getStorageSync('want_to_buy'));
      this_.goHearFroMmemberCoupons(options);
    });
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

  //初始化订单数据
  initialOrderData: function (pro_info) {
    this.setData({
      pro_title: pro_info.pro_name,  //产品的标题
      pro_img: pro_info.pro_avatar,  //产品banner图
      pro_id: pro_info.pro_shopId,  //产品的id
      open_choice_type_flag: false,   //型号选择打开与隐藏  true 打开
      buy_num: pro_info.pro_number,  //购买多少件
      price_now: pro_info.pro_unit_Price,//选中商品现在售价
    });
    this.data.goods_max = pro_info.pro_stocknum;  //库存
  },

  //修改购买的件数
  addOrReduceGoodsNum(e) {
    let type = e.currentTarget.dataset.buy_type;
    let buy_count = this.data.buy_num;
    let max = this.data.goods_max;   //最大选择的件数  及库存
    let min = 1;   //最小选择的件数
    if (type == 'add') {
      if (buy_count < max) {
        buy_count++;
      } else {
        buy_count = max;
      }
    } else if (type == 'reduce') {
      if (buy_count > 1) {
        buy_count--;
      } else {
        buy_count = min;
      }
    } else if (type == 'npt') {
      let count = e.detail.value;
      if (count > max) {
        buy_count = max;
        wx.showToast({
          title: '库存不足',
        })
      } else if (count < min) {
        buy_count = min;
      } else {
        buy_count = count;
      }
    }
    this.data.buy_num = buy_count;
    this.setData({
      buy_num: buy_count
    });
  },

  //获取能使用的积分
  getPoint() {
    let this_ = this;
    ajax.GET('BMemberService/getByid').then(res => {
      this_.setData({
        can_use_point: res.data.integral
      })
    })
  },

  //输入使用多少积分
  changeUsePoint(e) {
    let po = e.detail.value;
    let can_user_po = this.data.can_use_point;
    if (po > can_user_po) {
      this.setData({
        use_point: can_user_po
      });
      wx.showToast({
        title: '你能使用的积分为' + this.data.can_use_point + '积分',
        icon: 'none'
      })
    } else {
      this.setData({
        use_point: po
      });
    }
  },

  //获取用户的收货地址
  getAddress() {
    let this_ = this;
    ajax.GET('BMemberService/getUserAddress', {
      isdefaultads: 1
    }).then(res => {
      let address_da = res.data[0];
      this_.setData({
        ueser_address: {
          name: address_da.aname,  //收件人的姓名
          address: address_da.address,  //详细地址
          region: address_da.region,  //地区
          tel: address_da.aphone, //收件人点话
          address_id: address_da.bUseraddressid  //收货地址的id
        }
      });
    });
  },

  //跳转选收货地址页面
  goChoiceAddress() {
    wx.navigateTo({
      url: '../../child/address/address',
    })
  },

  //生成订单
  creatOrder() {
    let da = this.data;
    let this_ = this;
    ajax.GET('TUserOrderService/SaveShopOrder', {
      shopNum: da.buy_num,
      shopId: da.pro_id
    }).then(res => {
      wx.showToast({
        title: '订单生成成功',
      });
      this_.setData({
        show_flag: true,
        order_info: res.data
      });
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
    let data = this.data;
    let APP_URL = getApp().globalData.APP_URL;
    let paytype = e.currentTarget.dataset.pay_type;
    let session_id = wx.getStorageSync('session_id');
    ajax.GET('TUserOrderService/payShopOrder', {
      orderid: data.order_info.myOrder.tUserorderid,   //订单id
      useraddressid: data.ueser_address.address_id,  //地址id
      shopNum: data.buy_num,   //购买件数
      monney: data.price_now * data.buy_num,   //支付金额
      payScore: data.use_point,  //使用的积分
      membercouponsid: data.membercoupons.id,  //要优惠券的id
      paytype: paytype, //支付方式 1分期 2支付宝 3微信 4银联5积分支付7积分+支付宝8积分+微信9积分+银联10积分+一网通
      sessionId: session_id
    }).then(res1 => {
      wx.showLoading({
        title: '正在支付',
      });
      let res = res1.data;
      if (res.resType == true) {
        if (res.payType == 1) {
          wx.navigateTo({
            url: 'paySuccess.html?type=mall',
          })
        } else if (paytype == 10) {//如果是积分+一网通支付
          getCmbSign(res.myOrder.thirdorderno, APP_URL + "paytemp.html?type=10");
          //调用第三方支付
        } else if (paytype == 9) {
          doUnionPay(res.myOrder.thirdorderno, APP_URL + "paytemp.html?type=9");
        } else if (paytype == 8) {
          this_.doWweixinPay(res.myOrder.thirdorderno, APP_URL + 'paytemp.html?type=8');
        }
      } else {
        wx.hideLoading();
        wx.showToast({
          title: '支付失败',
        })
      }
    });
  },

  //从优惠券页面跳过来
  goHearFroMmemberCoupons(o) {
    if (typeof o.membercouponsid != 'undefined') {
      this.setData({
        membercoupons: { //优惠券
          id: o.membercouponsid
        },
      });
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
            'success' :function (res){   //调用支付成功回调
                wx.showToast({
                  title: '支付成功',
                  icon : 'success'
                })
            },
            'fail' : function(){  //调用失败回调
                wx.showToast({
                  title: '支付失败',
                })
            },
            'complete': function(){   //支付接口调用完毕回调

            }
          })
          
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '微信支付失败',
            icon: 'none'
          })
        }
      }
    })
  },


})