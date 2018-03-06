const check = ()=>{
	let userInfo =wx.getStorageSync('yfsdmember')||false
	if (!userInfo) {
		wx.navigateTo({
			url: '../common/login/login'
		})
	}
}


module.exports = {
		check
}