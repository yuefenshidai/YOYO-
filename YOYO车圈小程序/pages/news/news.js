// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  tabText: [{ name: '热门', active: true, items: 'rem',offset:0,ending:false }, 
		  { name: '用车', active: false, items: 'yongc', offset: 0, ending:false}, 
		  { name: '趣闻', active: false, items: 'quw', offset: 0, ending:false}, 
		  { name: '车险', active: false, items: 'chex', offset: 0,ending:false}, 
		  { name: '科技', active: false, items: 'kej', offset: 0,ending:false}],
	  avtiveIndex:0,
	  listVIew:{
		  rem:[],
		  yongc:[],
		  quw:[],
		  chex:[],
		  kej:[]
	  }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  this.getList()
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
	 this.changeOffset()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

	/**
   * tab切换事件
   */
  tabChange: function (event){
	  let idx = event.currentTarget.dataset.index
	  let data = this.data.tabText
	  let listView = this.data.listVIew
	  if (idx === this.data.avtiveIndex) return
	  data.forEach((item, i) => {
			  item.active = false
			  this.setData({
				  tabText: data
			  })
	  })
	  data.forEach((item,i)=>{
		  if (idx===i){
			  data[idx].active = true
			  this.setData({
				  tabText: data,
				  avtiveIndex:idx
			  })
			  if (listView[data[idx].items].length==0){
				  this.getList()
			  }
		  }
	  })
  },

  /**
   * 请求数据
   */
  getList: function (event){
	  wx.showNavigationBarLoading()
	  let url = getApp().globalData.url_root
	  let listVIew = this.data.listVIew
	  let tabText = this.data.tabText
	  if (!tabText[this.data.avtiveIndex].ending){
		  wx.request({
			  url: url + 'TnewsService/getNewsByType',
			  data: {
				  offset: this.data.tabText[this.data.avtiveIndex].offset,
				  limit: 10,
				  type: this.data.avtiveIndex + 1
			  },
			  success: res => {
				  wx.hideNavigationBarLoading()
				  if(res.data.rows.length!=0){
					  switch (this.data.avtiveIndex + 1) {
						  case 1:
							  listVIew.rem.push(...res.data.rows)
							  break;
						  case 2:
							  listVIew.yongc.push(...res.data.rows)
							  break;
						  case 3:
							  listVIew.quw.push(...res.data.rows)
							  break;
						  case 4:
							  listVIew.chex.push(...res.data.rows)
							  break;
						  case 5:
							  listVIew.kej.push(...res.data.rows)
							  break;
					  }
					  this.setData({
						  listVIew: listVIew
					  })
				  }else{
					  tabText[this.data.avtiveIndex].ending = true
					this.setData({
						tabText: tabText
					})
				  }  
			  }
		  })
	  }else{
		  wx.showToast({
			  title: tabText[this.data.avtiveIndex].name + '没有更多了',
			  icon: 'none',
			  duration: 2000
		  })
		  wx.hideNavigationBarLoading()
	  }
  },

    /**
   * 变更offset
   */
  changeOffset:function(){
	  let _tabText = this.data.tabText
	  _tabText[this.data.avtiveIndex].offset += 10
	//   _tabText[this.data.avtiveIndex].limit += 10
	  this.setData({
		  tabText : _tabText
	  })
	  this.getList()
  }
})