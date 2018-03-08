//获取定位
const getLocal = ()=>{
	return new Promise((resolvd,reject)=>{
		wx.getLocation({
			type: 'wgs84',
			success: function (res) {
				resolvd(res)
			}
		})
	})
}
module.exports = {
	getLocal
}