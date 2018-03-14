
import ajax from '../../assets/js/ajax.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_index: 1,  //当前显示的tab序号   0：保险订单   1：商城订单
    insurance_order_arr: [],  //保险订单数组
    mall_order_arr: [],  //商城订单数组
    mall_order_detail_arr: [],  //商城订单详细数组

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInsuranceOrder(1);
    this.getInsuranceOrder(2);
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

  //tab切换
  tab(e) {
    if (typeof e.currentTarget.dataset.tab_index != 'undefined') {
      this.setData({
        tab_index: e.currentTarget.dataset.tab_index
      });
    } else if (typeof e.detail.current != 'undefined') {
      this.setData({
        tab_index: e.detail.current
      });
    }
  },

  //获取保险订单
  getInsuranceOrder(order_type) {
    let this_ = this;
    ajax.GET('TUserOrderService/getMyOrderList', {
      ordertype: order_type
    }).then(res => {
      if (res.statusCode == 200) {
        let arr = res.data;
        if (order_type == 1) {
          this_.setData({
            insurance_order_arr: res.data
          });
        } else if (order_type == 2) {
          let mall_arr = [];
          for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            let obj = {};
            let mallImg_url = getApp().globalData.mallImg_url;
            obj.img_url = mallImg_url + item.productId;  //产品图片
            obj.title = item.goodsName;  //产品名字
            obj.price = item.userorder.discountprice;  //产品单价
            obj.order_status = item.userorder.orderstate;  //订单的状态  0未确认 1 待支付  2待发货 3待收货 4已完成 5已取消
            obj.order_creat_time = item.userorder.createtime.substring(0, 10); //订单生成时间
            obj.good_num = item.goodsNum;  //产品的件数
            obj.pay_money = item.userorder.discountprice; //支付的金额 
            // obj.order_id = item.
            mall_arr.push(obj);
          }
          this_.setData({
            mall_order_arr: mall_arr,
            mall_order_detail_arr: arr
          }, function () {
          });
        }
      }
    });
  },

  //跳转订单详情页
  goOrderDetail(e) {
    let index = e.currentTarget.dataset.order_index;
    let this_ = this;
    wx.setStorage({
      key: 'order_detail_show',
      data: this_.data.mall_order_detail_arr[index],
      success() {
        wx.navigateTo({
          url: 'child/order_detail/order_detail',
        })
      }
    });
  }
})