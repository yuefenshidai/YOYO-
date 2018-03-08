// pages/home/child/carbeauty/carbeauty.js
import { getLocal } from  "../../../../../assets/js/getLocation.js"
import ajax from "../../../../../assets/js/ajax.js"
import callBaiduLocation from "../../../../../assets/js/callbaiduLocation.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
	offset:0,localtion:{X:null,Y:null},List:[],loading:false,
	urlroot: getApp().globalData.url_root
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  getLocal().then((res)=>{
		  let gcj02 = callBaiduLocation.wgs84togcj02(res.longitude, res.latitude);
		  let bd09 = callBaiduLocation.gcj02tobd09(gcj02[0], gcj02[1]);
		  this.setData({ localtion: { X: bd09[0], Y: bd09[1]}})
		  this.getList()
	  })
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
	  if(!this.data.loading){
		  this.getList()
	  }
	 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

    /**
   * 获取列表
   */
  getList(){
	  wx.showNavigationBarLoading()
	  this.setData({ loading:true})
	  ajax.GET('ShopAdminService/getShopsByDistance',{
		  limit: '30',
		  offset: this.data.offset,
		  coordinateX: this.data.localtion.X,
		  coordinateY: this.data.localtion.Y
	  }).then((res)=>{
		  wx.hideNavigationBarLoading()
		  this.setData({ loading: false })
		  let _List = this.data.List
		  _List .push(...res.data.rows)
		  this.setData({ offset: this.data.offset + 30, List: _List})
	  },res=>{

	  })
  },

    /**
   * 图片加载失败
   */
  imgerror(e){
	  let _list = this.data.List
	  _list[e.target.dataset.index].imageurl = 'error'
	  this.setData({
		  List: _list
	  })
  },
  call(e){
	let phone = e.currentTarget.dataset.phone
	if (phone=='') return
	wx.makePhoneCall({
		phoneNumber: phone 
	})
  },
  gps(e){
	  let gcj02 = callBaiduLocation.bd09togcj02(e.currentTarget.dataset.x, e.currentTarget.dataset.y)
	  wx.openLocation({
		  latitude: gcj02[1],
		  longitude: gcj02[0],
		  scale: 28
	  })
  }
})