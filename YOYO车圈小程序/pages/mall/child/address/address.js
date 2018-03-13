import ajax from '../../../../assets/js/ajax.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    default_address: 0,  //默认地址序号
    // address_arr : [{    //地址数组
    //   name : '',
    //   tel : '',
    //   region : ''
    // }],

    address_arr: [],  //地址数组


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressInfo();
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

  //获取地址信息
  getAddressInfo() {
    ajax.GET('BMemberService/getUserAddress').then(res => {
      let a = res.data;
      for (let i = 0; i < a.length; i++) {
        let item = a[i];
        if (item.isdefaultads == 1) {
          this.setData({
            default_address: i
          });
        }
      }
      this.setData({
        address_arr: a
      });
    });
  },

  //设置默认地址
  setDefaultAddress(e) {
    let e_data = e.currentTarget.dataset;
    let this_ = this;
    this.setData({
      default_address: e_data.default_index
    });
    ajax.GET('BMemberService/saveUserAddress', {
      bUseraddressid: e_data.address_id,
      isdefaultads: 1
    }).then(res => {
      wx.showToast({
        title: '设置成功',
      })
    });
  },

  //删除地址
  deleteAddress(e) {
    let id = e.currentTarget.dataset.delete_id;  //要删除的地址的id
    let index = e.currentTarget.dataset.delete_index;  //要删除地址在address_arr数组中的位置
    let this_ = this;
    wx.showModal({
      title: '确认删除?',
      success(res) {
        if (res.confirm) {
          ajax.GET('BMemberService/delUserAddress', {
            bUseraddressid: id
          }).then((res)=>{
            this_.setData({
              address_arr: this_.data.address_arr.splice(index,1)
            });
          }); 
        }
      }
    });


  },

  //跳转编辑与新建地址信息页面
  goAddOrChangeAddress(){
    wx.navigateTo({
      url: '../address_edit/address_edit',
    })
  },
  


  //跳转订单页面
  goItemBuy(e) {
    let this_ = this;
    let address_da = this_.data.address_arr[e.currentTarget.dataset.default_index];
    let all_pages = getCurrentPages();
    let prev_page = all_pages[all_pages.length - 2];
    prev_page.setData({
      ueser_address: {
        name: address_da.aname,  //收件人的姓名
        address: address_da.address,  //详细地址
        region: address_da.region,  //地区
        tel: address_da.aphone, //收件人点话
        address_id: address_da.bUseraddressid  //收货地址的id
      }
    }, () => {
      wx.navigateBack();
    });
  }
})