// pages/home/child/illegal/illegal.js
import ajax from '../../../../../assets/js/ajax.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
		List:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  this.getMycarList()
	  this.listen()
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

  getMycarList(){
	  ajax.GET('BMemberService/getMyCarList').then(res => {
		  this.setData({
			  List:res.data
		  })
	  })
  }
  ,
  LinkToAdd(){
	  wx.navigateTo({
		  url: './child/illegal_add/illegal_add',
	  })
  },

  LinkToResult(e){
		console.log(e)
	//   wx.navigateTo({
	// 	  url: './child/illegal_result/illegal_result',
	//   })
  },

  listen(){
	  let app = getApp()
	  app.listenEvt('added',res=>{
		  console.log(res)
	  })
  }

})