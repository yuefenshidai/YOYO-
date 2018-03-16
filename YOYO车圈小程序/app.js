//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
	
	// 判定是否登陆
	let yfsdmember = wx.getStorageSync('yfsdmember')
	if (yfsdmember) {
		this.globalData.islogin = true
	}
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
	url_root: "https://www.happyinstallment.com/yfsd/",
	img_url: "https://www.happyinstallment.com/yfsd/commonAction/getimg?fileName=",
	mallImg_url:"https://www.happyinstallment.com/yfsd/commonAction/getimgByDataid?dataid=",
	islogin:false
  },
  data: {
	 
  },
//   监听事件列表
  EvtPassData:[],
  sendEvt:function(option){
	let EvtPassData = this.EvtPassData
	EvtPassData.forEach((item,i)=> {
		if (item.evt == option.evt){
			if (option.data) {
				item.fn(option.data)
			}else{
				item.fn()
			}
		}
	})
  },
  listenEvt:function(evt,fn){
	  if (evt && fn){
		  let newEvtItem = {
			  evt: evt,
			  fn: fn
		  }
		  this.EvtPassData.push(newEvtItem)
		  console.log(this.EvtPassData)
	  }else{
		  console.error('listenEvt必须有2个参数,第一个为事件名称，第二个为回调函数')
	  }
		
  }
})