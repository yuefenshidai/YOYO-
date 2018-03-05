const check = ()=>{
	let userid = wx.getStorageSync('userid')

	if (!userid) {
		wx.navigateTo({
			url: '../common/login/login'
		})
	}
}


module.exports = {
		check
}