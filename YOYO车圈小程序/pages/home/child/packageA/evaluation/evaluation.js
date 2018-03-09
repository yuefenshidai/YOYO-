import util from '../../../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  evaluations:{
		  data:null,
		  carUse:{
			name:'自用',
			value:1
		  },
		  carStatus: {
			  name: '一般',
			  value: 2
		  }
	  },
	  isChoosed:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  //设置头部
	  wx.setNavigationBarColor({
		  frontColor: '#ffffff',
		  backgroundColor: '#2e3f63',
		  animation: {
			  duration: 1000,
			  timingFunc: 'easeIn'
		  }
	  })

	  //获取时间
	  let date = new Date()
	  let evaluations = this.data.evaluations
	  evaluations.date = util.formatTime(date).substring(0, 7).replace(/\//g, '-')
	  this.setData({
		  evaluations: evaluations
	  })
  },

  //时间选择器改变
  dateChange(e){
	   let evaluations = this.data.evaluations
	   evaluations.date = e.detail.value
		this.setData({
			evaluations: evaluations
		})
  },

  //车辆用途选择器
  carUseChange(e){
	  let itemList = ['自用', '公务商用', '营运']
	  wx.showActionSheet({
		  itemList: itemList,
		  success: res=> {
			  let evaluations = this.data.evaluations
			  evaluations.carUse = {
				  name: itemList[res.tapIndex],
				  value: res.tapIndex + 1
			  }
			  this.setData({
				  evaluations: evaluations
			  })
		  }
	  })
  },

  //车辆状况选择器
  carStatusChange(){
	  let itemList = ['优秀', '一般', '较差']
	  wx.showActionSheet({
		  itemList: itemList,
		  success: res => {
			  let evaluations = this.data.evaluations
			  evaluations.carStatus = {
				  name: itemList[res.tapIndex],
				  value: res.tapIndex + 1
			  }
			  this.setData({
				  evaluations: evaluations
			  })
		  }
	  })
  	},

	//选择车型
  chooseCarBrand(e){
	  if (!this.data.isChoosed){
		  wx.navigateTo({
			  url: './child/Vehiclebrand/Vehiclebrand',
		  })
	  }
  }
})