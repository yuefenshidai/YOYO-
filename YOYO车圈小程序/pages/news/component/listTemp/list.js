// pages/news/child/component/listTemp/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	  listView: { 
		  type: Object,
		  value: '', 
		  observer: function (newVal, oldVal) { } 
	  }
  },

  /**
   * 组件的初始数据
   */
  data: {
	  fileNameImg_url: getApp().globalData.img_url,
	  Height:"1000rpx"
  },

  /**
   * 组件的方法列表
   */
  methods: {
	  loadMore(){
		  console.log(123)
	  },
	  tapEvent(e){
		  console.log(e.currentTarget.dataset.id)
	  }
  },

	/**
   * ready
   */
  ready(){
	  wx.getSystemInfo({
		  success:  (res) => {
			  this.setData({
				  Height: res.windowHeight*2 - 100 + 'rpx'
			  })
		  }
	  })
  }
})
