const check = (that,call)=>{
	let isLogin = getApp().globalData.islogin
	if (isLogin){
		that.setData({
			isLogin: true
		})
		call&&call()
	}else{
		wx.navigateTo({
			url: '../common/login/login'
		})
		getApp().listenEvt('logined', (VAL) => {
			call && call()
			that.setData({
				isLogin: true
			})
			getApp().globalData.islogin = true
		})
	}

	getApp().listenEvt('loginout', (VAL) => {
		that.setData({
			isLogin: false
		})
		getApp().globalData.islogin = false
	})
}


module.exports = {
		check
}