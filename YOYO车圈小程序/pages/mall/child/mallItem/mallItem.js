// pages/mall/child/mallItem/mallItem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mall_img_url: '',   //商城图片从服务器获取路径
    url_root: '',
    goods_arr : [],
    show_good : ''   //显示的产品型号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let app_goldble_data = getApp().globalData;
    console.log(app_goldble_data);
    let this_ = this;
    this.mall_img_url = app_goldble_data.mallImg_url;
    this.url_root = app_goldble_data.url_root;
    this.setData({
      mall_img_url: app_goldble_data.mallImg_url
    }, function () {
      this_.getGoods();
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


  //获取物品数据
  getGoods() {
    wx.showLoading({
      title: '请求中...',
      mask: true
    });
    let this_ = this;
    wx.request({
      url: this_.url_root + 'TSkuService/getTskuByProductid',
      data: {
        // productid : this_.pro_id
        productid: '1710207c856978b56311e7990900155d4c0321'
      },
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          // console.log('请求成功');
          // console.log(JSON.stringify(res, null, 2));
          this_.dealGoodsInfo(res.data.rows);

        } else {
          wx.showToast({
            title : '请求失败',
            icon : 'none',
            mask : true
          });
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '居然断网了，请联网重试',
          icon: 'none',
          mask: true,
          duration : 2000
        });
      }
    })
  },

  //处理商品数据
  dealGoodsInfo (data) {
    console.log(data);
    let this_ = this;
    let g_arr = [];
    for(let i = 0;i<data.length;i++){
      let item = data[i];
      let obj = {};
      obj.saleprice = item.saleprice;  //商品现在售价
      obj.saleintegral = item.saleintegral;  //商品之前的价格
      obj.stocknum = item.stocknum;   //库存
      obj.productid = item.productid;  //产品的id
      
      let a = item.updateuserid.split(',');
      // for(let j = 0;j<a.length;i++){
      //   let b = a[j].split(':');
      //   if (b[0].substring(0, 2) == '颜色'){
      //     obj.pro_color = b[1];   //产品颜色
      //     obj.pro_color_id = b[0].substring(3,b[0].length-1);   //产品颜色id
      //   } else if (b[0].substring(0, 2) == '版本'){
      //     obj.pro_edition = b[1];   //产品版本
      //     obj.pro_edition_id = b[0].substring(3, b[0].length - 1);   //产品版本id
      //   }
      // }
      obj.isdefault = item.isdefault;   //默认商品显示    1：默认   0： 不是默认
      g_arr.push(obj);
      // 默认显示
      // if(){
      //   this_.dataSet({
      //     show_good : 
      //   });
      // }
      console.log(obj);
    }
    console.log('遍历完成');
    this_.setData({
      goods_arr: g_arr
    },function(){
      console.log(this_.goods_arr);
    });
  }
})