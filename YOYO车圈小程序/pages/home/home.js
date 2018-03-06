Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bannerImsg: ['./img/banner1.jpg'],
		Sbanner: ['买车险,送积分', '推荐朋友购买车险可获100积分'],
		homeMallList:[],
		homeNewsList:[],
		img_url: getApp().globalData.mallImg_url,
		fileNameImg_url: getApp().globalData.img_url
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getMallInfo()
		this.getNewList()
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

	/**
	 * 请求首页商城数据
	 */
	getMallInfo(){
		let url = getApp().globalData.url_root 
		wx.request({
			url: url + 'TProductSkuService/getAllInteProd', 
			data: {
				offset: 0,
				limit: 6,
			},
			success:  res=> {
				this.setData({
					homeMallList:res.data.rows
				})
			}
		})
	},

	/**
	 * 请求首页商城数据
	 */
	getNewList(){
		let url = getApp().globalData.url_root
		wx.request({
			url: url + 'TnewsService/getNewsByType',
			data: {
				offset: 0,
				limit: 3,
				type: 1
			},
			success: res => {
				this.setData({
					homeNewsList: res.data.rows
				})
			}
		})
	},

	/**
	 * 请求首页商城数据
	 */
	calcDays(d){
		console.log(d)
	},
	/*
		onTabItemTap点击TabBar
	*/
	onTabItemTap(e){
		console.log(e)
	}
})