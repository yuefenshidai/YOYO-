// pages/user/user.js
// let check = require("../../assets/js/chekLogin.js")
import check from "../../assets/js/chekLogin.js"
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		isLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  let userid = wx.getStorageSync('userid')
	  if (userid) this.isLogin = true
	  check.check()
	  App.listenEvt('logined',(VAL)=>{
		  let userInfo = JSON.parse(wx.getStorageSync('yfsdmember'))
		  console.log(userInfo)
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /*
	  onTabItemTap点击TabBar
  */
  getUserInfo(e) {
	  wx.showNavigationBarLoading()
	//   wx.request({
	// 	  url: '',
	//   })
  }
})