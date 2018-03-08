// pages/home/child/packageA/illegal/child/illegal_add/illegal_add.js
import util from '../../../../../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
	Step: 1,
	fromdate: '2000-01-01',
	nowdate:null,
	formData:{
		licenseNo:null,
		Vin:null,
		engineNo:null
	},
	tips:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	let date = new Date()
	let _date = util.formatTime(date).replace(/\//g,'-')
	this.setData({
		nowdate: _date.substring(0,10)
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

  nextStep(){
	  this.setData({ Step:2})
  },

  inputEvt(e){
	let formData = this.data.formData
	formData[e.currentTarget.dataset.type] = e.detail.value.toUpperCase()
	this.setData({ formData: formData,tips:null})
  },

  pikcerDateChange(e){
	  this.setData({ nowdate: e.detail.value})
  },

  sureSubmit(e){
	if (this.checkInfo()==''){
		let app = getApp()
		app.sendEvt({
			evt: 'added',
			data: 'aaa'
		})
	}else{
		this.setData({ tips: this.checkInfo()})
	}
  },

  checkInfo(){
	  let result = ' '
	  if (!this.data.formData.licenseNo || this.data.formData.licenseNo.length != 6){
		  result = '车牌号有误'
	  } 
	  if (!this.data.formData.licenseNo || this.data.formData.Vin.length < 15) {
		  result = '车架号有误'
	  }
	  if (!this.data.formData.licenseNo || this.data.formData.engineNo.length <6) {
		  result = '发动机号有误'
	  }
	  return result
  } 		
})