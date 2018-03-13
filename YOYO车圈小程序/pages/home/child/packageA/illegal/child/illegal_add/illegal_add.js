// pages/home/child/packageA/illegal/child/illegal_add/illegal_add.js
import util from '../../../../../../../utils/util.js'
import ajax from '../../../../../../../assets/js/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
	Step: 1,
	fromdate: '2000-01-01',
	nowdate:null,
	formData:{
		licenseNo:'',
		Vin: '',
		engineNo: ''
	},
	tips:null,
	sureLoading:false
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
//点击下一步先查有没有查询过本车的信息，如果有则把数据帮用户填上，如果没有则让用户自己填
nextStep(){
	let Info = wx.getStorageSync('ViolationQueryDATA')
	let _flag =0
	let itemInInfo = null
	if (Info){
		Info.forEach((item,i)=>{
			if (item.plateNumber == '川' + this.data.formData.licenseNo){
				_flag++
				itemInInfo = item
			}else{
				_flag--
			}
		})
		if (_flag>0){
			let formData = this.data.formData
			formData.licenseNo = itemInInfo.plateNumber.replace('川', '')
			formData.Vin = itemInInfo.vin
			formData.engineNo = itemInInfo.engineNo
			this.setData({
				formData: formData,
				Step: 2
			})
		}
	}else{
		if (this.data.formData.licenseNo && this.data.formData.licenseNo.length == 6) {
			this.setData({ Step: 2 })
		}
	}
},
//实时记录用户的输入，并保存
  inputEvt(e){
	let formData = this.data.formData
	formData[e.currentTarget.dataset.type] = e.detail.value.toUpperCase()
	this.setData({ formData: formData,tips:null})
  },
//日期选择
  pikcerDateChange(e){
	  this.setData({ nowdate: e.detail.value})
  },
//提交用户的输入如果成功把结果跟输入的信息放在本地
  sureSubmit(e){
	if (this.data.sureLoading) return 
	if (this.checkInfo()==' '){
		this.setData({ sureLoading:true})
		let _data = {
			plateNumber: '川' + this.data.formData.licenseNo,
			engineNo: this.data.formData.engineNo,
			vin: this.data.formData.Vin,
			carType: "02",
			city: ''
		}
		ajax.GET('BCarinformationService/queryViolation', _data).then(res=>{
			this.setData({ sureLoading: false })
			let ViolationQueryDATA = wx.getStorageSync('ViolationQueryDATA')||[]
			let Flag = 0
			if (ViolationQueryDATA){
				ViolationQueryDATA.length > 0 && ViolationQueryDATA.forEach((item, i) => {
					item.plateNumber == _data.plateNumber ? Flag++ : Flag--
				})
				if (Flag<=0){
					ViolationQueryDATA.push(_data)
				}
			}
			wx.setStorageSync('ViolationQueryDATA', ViolationQueryDATA)
			wx.setStorageSync('ViolationInfo', res.data)
			wx.navigateTo({
				url: '../illegal_result/illegal_result',
			})
		},res=>{
			this.setData({ sureLoading: false })
			wx.showModal({
				title: '提示',
				content:res.data,
				showCancel: false,
				confirmColor: " #ff7c5e"
			})
		})
		
	}else{
		this.setData({ tips: this.checkInfo()})
	}
  },
//检查用户的输入
  checkInfo(){
	  let result = ' '
	  if (!this.data.formData.licenseNo || this.data.formData.licenseNo.length != 6){
		  result = '车牌号有误'
	  } 
	  if (!this.data.formData.licenseNo || this.data.formData.Vin.length < 6) {
		  result = '车架号有误'
	  }
	  if (!this.data.formData.licenseNo || this.data.formData.engineNo.length <6) {
		  result = '发动机号有误'
	  }
	  return result
  } 		
})