// pages/mall/mall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    new_info : [
      '这是新闻',
      '这还是新闻'
    ],
    go_list : [
      {
        img_url: './img/jifen.png',
        text : '可用积分',
        href : ''
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
  
  },


  /**
   * 点击触发
   */
  checkMe : function (data){
    console.log('点击了'+JSON.stringify(data,null,2));
  },

  /**
   * 请求得到商品数据
   */
  getGoodsData : function(){
    wx.request({
      url: 'http://test.happyinstallment.com/yfsd/',
    });
  }
})