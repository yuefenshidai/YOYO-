// pages/mall/mall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    new_info: [
      '这是新闻',
      '这还是新闻'
    ],
    go_list: [
      {
        img_url: './img/jifen.png',
        text: '可用积分',
        href: ''
      },
      {
        img_url: './img/duihuan.png',
        text: '兑换记录',
        href: ''
      },
      {
        img_url: './img/zhuanjifen.png',
        text: '如何赚积分',
        href: ''
      }
    ],
    goods_arr: [],
    mall_img_url: '',   //商城图片从服务器获取路径
    url_root: '',
    offset: 0,
    limit: 20

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app_goldble_data = getApp().globalData;
    let this_ = this;
    this.mall_img_url = app_goldble_data.mallImg_url;
    this.url_root = app_goldble_data.url_root;
    this.setData({
      mall_img_url: app_goldble_data.mallImg_url
    }, function () {
      this_.getGoodsData();
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
    // alert('别啦了');
    this.getGoodsData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 请求得到商品数据
   */
  getGoodsData: function () {
    // let url = getApp().globalData.url_root;
    let this_ = this;
    let arr = this.data.goods_arr;
    wx.request({
      url: this.url_root + 'TProductSkuService/getAllInteProd',
      data: {
        offset: this.data.offset,
        limit: this.data.limit
      },
      success: function (res) {
        this_.data.offset += 20;
        let res_arr = res.data.rows;
        if (res_arr.length == 0) {
          wx.showToast({
            title : '没有更多商品了',
            icon: 'none',
            mask : true
          });
        } else {
          for (let i = 0; i < res_arr.length; i++) {
            arr.push(res_arr[i]);
          }
          this_.setData({
            goods_arr: arr
          });
        }

      }
    });
  },


  //显示产品详情
  goodDetail(e){
    console.log(JSON.stringify(e,null,2));
    let data = e.currentTarget.dataset;
    let pro_id = data.pro_id;
    // wx.navigateTo({
    //   url: 'child/mallItem/mallItem?pro_id=' + pro_id,
    // })
  }
})