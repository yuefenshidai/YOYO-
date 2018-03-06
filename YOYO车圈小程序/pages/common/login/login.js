import { getVcode, checkVcodeTime } from '../../../assets/js/getVcode.js'
import ajax from '../../../assets/js/ajax.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
		loginModel:'手机验证码登陆',
		timelate:'获取验证码',
		inputData:{
			mobile:"",
			password: "",
			vcode: ""
		},
		submitLoading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  checkVcodeTime((res)=>{
		  this.setData({
			  timelate: res
		  })
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
  submitLogin:function(e){
	  let App = getApp()
	  if (this.data.submitLoading) return
	  if (this.data.inputData.mobile.length!=11) {
		  wx.showToast({
			  title: '不正确的电话',
			  icon: "none",
			  duration: 1000
		  })
		  this.setData({
			  submitLoading: false
		  })
		  return
	  }
	  if (this.data.loginModel == '密码登陆'){
		  if (this.data.inputData.vcode.length != 6 ) {
			  wx.showToast({
				  title: '不正确的验证码',
				  icon: "none",
				  duration: 1000
			  })
			  this.setData({
				  submitLoading: false
			  })
			  return
		  }
	  }else{
		  if (this.data.inputData.password.length < 6) {
			  wx.showToast({
				  title: '不正确的密码',
				  icon: "none",
				  duration: 1000
			  })
			  this.setData({
				  submitLoading: false
			  })
			  return
		  }
	  }
	  this.setData({
		  submitLoading: true
	  })
	  ajax.GET('BMemberService/login',{
		  userCode: this.data.inputData.mobile,
		  password: this.data.inputData.password,
		  dxyzm: this.data.inputData.vcode
	  }).then((res)=>{
		  let rep = JSON.stringify(res.data)
		  wx.setStorageSync('yfsdmember', rep)
		  App.sendEvt({
			  evt: 'logined'
		  })
		  this.setData({
			  submitLoading: false
		  })
		 wx.navigateBack()
		  }, (res) => {
			  this.setData({
				  submitLoading: false
			  })
			  wx.showModal({
				  title: '提示',
				  content: res.data.trim(),
				  showCancel: false,
				  confirmColor: " #ff7c5e"
			  })
		  })
  },

	// 验证码与手机密码登录模式切换
  changeModel:function(e) {
	  let loginModel = this.data.loginModel;
	  let model='';
	  let inputData = this.data.inputData
	  if (loginModel == '手机验证码登陆'){
		  inputData.password = ''
		  model = '密码登陆'
 	 }else{
		  model = '手机验证码登陆'
		  inputData.vcode = ''
	  }
	  this.setData({
		  loginModel: model,
		  inputData: inputData
	  })
  },

  //获取验证码

  getVcoded:function(e){
	  getVcode(this.data.inputData.mobile,(res)=>{
		  this.setData({
			  timelate: res
		  })
	  })
  },

  //输入事件
  inputEvt:function(e){
	let inputData = this.data.inputData
	let _type = e.target.dataset.type
	switch (_type){
		case 'mobile':
			inputData.mobile = e.detail.value
			break;
		case "password":
			inputData.password = e.detail.value
			break;
		case "vcode":
			inputData.vcode = e.detail.value
			break;
	}
	this.setData({
		inputData: inputData
	})
  }
})