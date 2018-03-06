// pages/user/user.js
// let check = require("../../assets/js/chekLogin.js")
import check from "../../assets/js/chekLogin.js"
import ajax from "../../assets/js/ajax.js"
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		isLogin:false,
		getedInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  let userInfo = wx.getStorageSync('yfsdmember')||false
	  
	  if (userInfo) {
		  this.setData({ isLogin:true  })
		  this.getUserInfo()
	  }
	  check.check()
	  App.listenEvt('logined',(VAL)=>{
		  this.getUserInfo()
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
	  let url_root = App.globalData.url_root
	  let userInfo = JSON.parse(wx.getStorageSync('yfsdmember'))
	  wx.showNavigationBarLoading()
	  ajax.GET('BMemberService/getByid').then(res=>{
		  this.setData({ isLogin: true, getedInfo:res.data})
		  wx.setStorageSync('yfsdmemberbyid', JSON.stringify(res.data))
		  wx.hideNavigationBarLoading()
	  })
  }
})