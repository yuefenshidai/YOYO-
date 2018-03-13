import util from '../../../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  evaluations:{
		  chooseBrand:{
			  name:'请选择车型',
			  id:null
		  },
		  date:null,
		  carUse:{
			name:'自用',
			value:1
		  },
		  carStatus: {
			  name: '一般',
			  value: 2
		  },
		  driveLong:0,
		  buyPrice:0
	  },
	  isChoosed:false,
	  endTime:null,
	  choosedImg:'',
	  offer_now_loading:false
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
	  let now = util.formatTime(date).substring(0, 7).replace(/\//g,'-')
	  evaluations.date = now
	  this.setData({
		  evaluations: evaluations,
		  endTime: now
	  })
	  //设置监听
	  this.eventListen()
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
  },

  //行驶里程监控
  driveLong(e){
	  console.log(e)
	  let evaluations = this.data.evaluations
	  evaluations.driveLong= e.detail.value
	  this.setData({
		  evaluations: evaluations
	  })
  },


  //购买价格监控
	buyPrice(e){
		console.log(e)
		let evaluations = this.data.evaluations
		evaluations.buyPrice = e.detail.value
		this.setData({
			evaluations: evaluations
		})
	},

  //注册事件监听
	eventListen(){
		let app = getApp();
		app.listenEvt('chooseBrand',(res)=>{
			let evaluations = this.data.evaluations
			evaluations.chooseBrand.name = res.title
			evaluations.chooseBrand.id = res.id
			evaluations.chooseBrand.imgid = res.imgid
			this.setData({
				evaluations: evaluations,
				choosedImg: "http://www.happyinstallment.com/app/image/Vehiclebrand-images/" + res.imgid+".jpg"
			})
		})
	},

	//开始估价
	sureOff(){
		if (this.checkInfo()==''){
			let evaluations = JSON.stringify(this.data.evaluations)
			wx.navigateTo({
				url: './child/evaluation_result/evaluation_result?data=' + evaluations
			})
		}else{
			wx.showModal({
				title: '提示',
				content: this.checkInfo().trim(),
				showCancel: false,
				confirmColor: " #ff7c5e"
			})
		}
	},

	//检查估价的信息是否填写完毕
	checkInfo(){
		let evaluations = this.data.evaluations
		let result = ''
		if (evaluations.buyPrice == 0) result = '购车价不能为空'
		if (evaluations.driveLong == 0) result = '行驶里程不能为空'
		if (!evaluations.carStatus.value) result = '还没有选择车辆状况'
		if (!evaluations.carUse.value) result = '还没有选择车辆用途'
		if (!evaluations.date) result = '还没有选择注册日期'
		if (!evaluations.chooseBrand.id) result = '还没有选择车型'
		return result
	}

})