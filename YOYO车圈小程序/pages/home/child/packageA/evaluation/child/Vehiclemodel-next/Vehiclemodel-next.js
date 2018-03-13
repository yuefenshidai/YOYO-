import ajax from '../../../../../../../assets/js/ajax.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			prevData: {
				id: options.id,
				imgid: options.imgid
			}
		})
		this.getList()
	},
	getList() {
		wx.showNavigationBarLoading()
		ajax.GET('SecondCar/getCarType', {
			series: this.data.prevData.id
		}).then(res => {
			wx.hideNavigationBarLoading()
			this.creatList(res.data.result.data)
		})
	},
	creatList(data) {
		let _list = []
		data.forEach((item, i) => {
			_list.push({
				key: item.pyear,
				list: []
			})
		})
		data.forEach((item, i) => {
			item.chexing_list.forEach((_item, i) => {
				_list.forEach((el, idx) => {
					if (el.key == item.pyear) {
						el.list.push({
							id: _item.id,
							big_ppname: _item.cxname,
							idx: this.data.prevData.imgid
						})
					}
				})
			})
		})
		this.setData({
			List: _list
		})
	}
})