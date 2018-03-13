// pages/mall/child/mallItem/mallItem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mall_img_url: '',   //商城图片从服务器获取路径
    url_root: '',   //
    pro_title: '',  //产品的标题
    pro_img: '',  //产品banner图
    pro_id: '',  //产品的id
    sku_id: '',  //产品详情id
    goods_arr: [],  //不同型号的产品数组
    goods_introduce: '', // 产品介绍
    open_choice_type_flag: false,   //型号选择打开与隐藏  true 打开
    show_good: '',   //显示的产品型号
    checkd_num: 0,   //选中的产品
    buy_num: 1,  //购买多少件
    price_now: 0,//选中商品现在售价
    price_before: 0,//选中商品的以前售价
    goods_max : 0,   //库存
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app_goldble_data = getApp().globalData;
    let this_ = this;
    this.mall_img_url = app_goldble_data.mallImg_url;
    this.url_root = app_goldble_data.url_root;
    this.data.pro_id = options.pro_id;
    this.data.sku_id = options.sku_id;
    this.setData({
      mall_img_url: app_goldble_data.mallImg_url
    }, function () {
      this_.getGoodsIntroduce();
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

  //获取物品介绍的数据
  getGoodsIntroduce() {
    let this_ = this;
    wx.request({
      url: this_.url_root + 'TProductSkuService/getInteProdById',
      data: {
        skuid: this_.data.sku_id
      },
      success(res) {
        if (res.statusCode == 200) {
          this_.setData({
            pro_img: this_.url_root + 'commonAction/getimgByDataid?dataid=' + res.data.productid,
            pro_title: res.data.productname,
            goods_introduce: res.data.productremarkStr
          });
        } else {
          wx.showToast({
            title: '请求失败',
          })
        }
      }
    })
  },

  //获取物品不同型号的数据
  getGoods() {
    wx.showLoading({
      title: '请求中...',
      mask: true
    });
    let this_ = this;
    wx.request({
      url: this_.url_root + 'TSkuService/getTskuByProductid',
      data: {
        productid: this_.data.pro_id
      },
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          this_.dealGoodsInfo(res.data.rows);
        } else {
          wx.showToast({
            title: '请求失败',
            icon: 'none',
            mask: true
          });
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '居然断网了，请联网重试',
          icon: 'none',
          mask: true,
          duration: 2000
        });
      }
    })
  },

  //处理商品数据
  dealGoodsInfo(data) {
    let this_ = this;
    let g_arr = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let obj = {};
      obj.saleprice = item.saleprice;  //商品现在售价
      obj.saleintegral = item.saleintegral;  //商品之前的价格
      obj.stocknum = item.stocknum;   //库存
      obj.productid = item.productid;  //产品的id
      if (typeof item.updateuserid != 'undefined') {
        let a = item.updateuserid.split(',');
        for (let j = 0; j < a.length; j++) {
          let b = a[j].split(':');
          if (b[0].substring(0, 2) == '颜色') {
            obj.pro_color = b[1];   //产品颜色
            obj.pro_color_id = b[0].substring(3, b[0].length - 1);   //产品颜色id
          } else if (b[0].substring(0, 2) == '版本') {
            obj.pro_edition = b[1];   //产品版本
            obj.pro_edition_id = b[0].substring(3, b[0].length - 1);   //产品版本id
          }
        }
      } else {
        obj.pro_color = '';   //产品颜色
        obj.pro_color_id = '';   //产品颜色id
        obj.pro_edition = '';   //产品版本
        obj.pro_edition_id = '';   //产品版本id
      }

      obj.isdefault = item.isdefault;   //默认商品显示    1：默认   0： 不是默认
      g_arr.push(obj);
    }
    this_.setData({
      goods_arr: g_arr
    }, function () {
      this_.setDefaultGoodsShow();
    });
  },

  //设置默认显示的物品
  setDefaultGoodsShow() {
    let g_arr = this.data.goods_arr;
    for (let i = 0; i < g_arr.length; i++) {
      let item = g_arr[i];
      if (item.isdefault == 1) {
        this.setData({
          show_good: item.pro_color + item.pro_edition,   //显示的产品型号
          checkd_num: i,   //选中的号
          price_now: item.saleprice,//选中商品现在售价
          price_before: item.saleintegral,//选中商品的以前售价
          goods_max: item.stocknum,   //库存
        });
      }
    }
  },

  //打开或关闭型号选择
  openTypeChoice(e) {
    let flag = e.currentTarget.dataset.open_flag;
    if (flag == 'open') {
      this.setData({
        open_choice_type_flag: true
      });
    } else if (flag == 'close') {
      this.setData({
        open_choice_type_flag: false
      });
    }
  },

  //选择型号
  choiceType(e) {
    let check_data = e.currentTarget.dataset;
    this.setData({
      checkd_num: check_data.index,
      show_good: check_data.goods_typd,
      price_now: check_data.saleprice,//选中商品现在售价
      price_before: check_data.saleintegral,//选中商品的以前售价
    });
  },

  //修改购买的件数
  addOrReduceGoodsNum(e) {
    let type = e.currentTarget.dataset.buy_type;
    let buy_count = this.data.buy_num;
    let max = this.data.goods_arr[this.data.checkd_num].stocknum;   //最大选择的件数
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

  //跳转订单生成
  goSureOrder() {
    console.log(this.data);
    let da = this.data;
    let want_to_buy = {
      pro_unit_Price: da.price_now,//单价
      pro_name: da.pro_title,//名字
      pro_avatar: da.pro_img,//图像
      pro_number: da.buy_num,//数量
      // pro_Integral: da.,//积分
      pro_stocknum: da.goods_max,//库存
      // pro_shopId: da.pro_id//商品ID
      pro_shopId: da.sku_id
    }
    wx.setStorageSync('want_to_buy', want_to_buy);
    wx.navigateTo({
      url: '../../child/itemBuy/itemBuy',
    })
  }
})