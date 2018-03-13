Component({
  /**
   * 组件的属性列表
   */
  properties: {
	  List: {
		  type: Object,
		  value: '',
		  observer: function (newVal, oldVal) { }
	  },
	  Viewtype:{
		  type: String,
		  value: 'Vehiclebrand',
		  observer: function (newVal, oldVal) { }
	  }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
	  //创建选择列表
	  CreatChooseList() {
		  const letters = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
		  this.setData({
			  letters: letters
		  })
	  },
	  //右侧选择按键
	  SrcollLetterStart(e) {
		  let id = '#' + e.currentTarget.dataset.letter
		  let Query = wx.createSelectorQuery().in(this)
		  this.setData({
			  viewLetter: e.currentTarget.dataset.letter
		  })
		  Query.selectViewport('#brandListWrap').scrollOffset(res => {
			  this.setData({
				  Scrolltop: res.scrollTop
			  })
		  }).exec()
		  Query.select(id).boundingClientRect((res) => {
			  let Scrolltop = this.data.Scrolltop
			  Scrolltop += res.top
			  wx.pageScrollTo({
				  scrollTop: Scrolltop,
				  duration: 0
			  })
		  }).exec()
	  },
	  SrcollLetterEnd(e) {
		  this.setData({
			  viewLetter: null
		  })
	  },
	  //选择进入下一步
	  chooseXil(e){
		  let Viewtype = this.properties.Viewtype
		   //品牌列表
		  if (Viewtype =='Vehiclebrand'){
			  wx.navigateTo({
				  url: '../Vehiclemodel/Vehiclemodel?id=' + e.currentTarget.dataset.id + '&imgid=' + e.currentTarget.dataset.imgid
			  })
		  }
		  if (Viewtype == 'Vehiclemodel'){
			//  Vehiclemodel - next
			wx.navigateTo({
				url: '../Vehiclemodel-next/Vehiclemodel-next?id=' + e.currentTarget.dataset.id + '&imgid=' + e.currentTarget.dataset.imgid
			})
		 }
		  if (Viewtype == 'Vehiclemodel-next') {
				let app = getApp();
				app.sendEvt({
					evt:'chooseBrand',
					data:{
						imgid: e.currentTarget.dataset.imgid,
						title: e.currentTarget.dataset.title,
						id: e.currentTarget.dataset.id
					}
				})
				wx.navigateBack({
					delta:3
				})
		  }
	  }
  },
  ready(){
	  this.CreatChooseList()
  }
})
