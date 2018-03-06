let isRun = false

const getVcode = (phone,fn)=> {
	if (isRun == true) {
		return
	}

	let now = new Date().getTime()
	let old = wx.getStorageSync("timelate") * 1
	let timnum = 61
	if (!fn || !phone) {
		console.error('getVcode()需要传递一个电话号码和回调函数，以便操作倒计时完毕后的步奏')
		return
	}
	if (phone.length!=11){
		wx.showToast({
			title: '不正确的电话',
			icon: "none",
			duration: 1000
		})
		return
	}

	if (now - old > 60000 || !old) {
		wx.setStorageSync("timelate", now)
		getVcodeAjax(phone)
		let Timer = setInterval(()=>{
			if (timnum>0){
				timnum--
				isRun = true
			}else{
				clearInterval(Timer)
				timnum = '获取验证码'
				isRun = false
			}
			fn(timnum)
		},1000)
	}else{
		let _timnum = parseInt((60000 - (now - old)) / 1000)
		let Timer = setInterval(() => {
			if (_timnum>0){
				_timnum--
				isRun = true
			}else{
				clearInterval(Timer)
				_timnum = '获取验证码'
				isRun = false
			}
			fn(_timnum)
		}, 1000)
	}
}

const checkVcodeTime = (fn)=> {
	let now = new Date().getTime()
	let old = wx.getStorageSync("timelate") * 1
	let timnum = 61
	if (!fn) {
		console.error('checkVcodeTime()需要传递一个回调函数，以便操作倒计时完毕后的步奏')
		return
	}
	if (now - old > 60000 || !old) {
		let Info = '获取验证码'	
		fn(Info)	
	} else {
		let _timnum = parseInt((60000 - (now - old)) / 1000)
		let Timer = setInterval(() => {
			if (_timnum > 0) {
				_timnum--
				isRun = true
			} else {
				clearInterval(Timer)
				_timnum = '获取验证码'
				isRun = false
			}
			fn(_timnum)
		}, 1000)
	}
}

const getVcodeAjax = (phone)=>{
	wx.request({
		url: getApp().globalData.url_root + 'AliyunService/sendSms?cellPhone=' + phone ,
	})
}
module.exports = {
	getVcode,
	checkVcodeTime
}