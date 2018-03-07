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
		fileNameImg_url: getApp().globalData.img_url,
		// menuView_List: [
		// 	{ title: '买车险', icon: './img/maichexian.png', link: './child/insurance/insurance' }, { title: '查违章', icon: './img/chaweizhang.png', link: './child/packageA/illegal/illegal' }, { title: '办理赔', icon: './img/banlipei.png', link: './child/packageA/claim/claim' }, { title: '找救援', icon: './img/zhaojiuyuan.png', link: './child/packageA/rescue/rescue' }],
		menuView_List: [
			{ title: '买车险', icon: './img/maichexian.png', link: './child/insurance/insurance' }, { title: '查违章', icon: './img/chaweizhang.png', link: './child/packageA/illegal/illegal' }, { title: '车价评估', icon: './img/chejiapinggu.png', link: './child/packageA/evaluation/evaluation' }, { title: '维修保养', icon: './img/qicheweixiu.png', link: './child/packageA/carbeauty/carbeauty' }],
		// menuView_List_s:[
		// 	{ title: '汽车美容', icon: './img/xichemeirong.png', link: './child/packageA/carbeauty/carbeauty' }, { title: '维修保养', icon: './img/qicheweixiu.png', link: './child/packageA/carbeauty/carbeauty' }, { title: '车价评估', icon: './img/chejiapinggu.png', link: './child/packageA/evaluation/evaluation' }, { title: '年检代办', icon: './img/nianjiandaiban.png', link: './child/packageA/expedited/expedited' }
		// ]
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

	/*
		跳转到新闻详情页面
	*/
	LinkToNewsDetail(e){
		let id = e.currentTarget.dataset.id
		wx.navigateTo({
			url: '../news/child/detail/detail?id='+id,
		})
	}
})