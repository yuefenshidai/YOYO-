const POST = (url,data)=> {
	return new Promise((resolve, reject)=>{
		let  _data = data || {}
		let _url = null
		let Info = wx.getStorageSync('yfsdmember') || false
		if (Info) {
			_data.userid = JSON.parse(Info).bMemberid || ''
		}
		_url = url.indexOf('http') != -1 ? url : getApp().globalData.url_root + url
		wx.request({
			url: _url ,
			data: _data,
			method: 'POST',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: function (res) {
				if (res.statusCode == 200) {
					resolve(res)
				} else {
					reject(res)
				}
			}
		})
	})
}

const GET = (url, data={})=> {
	return new Promise(
		(resolve, reject) => {
			// let _data = data||{}
			let _url = null
			let Info =wx.getStorageSync('yfsdmember')||false
			if (Info) {
				data.userid = JSON.parse(Info).bMemberid || ''
			}
			_url = url.indexOf('http') != -1 ? url : getApp().globalData.url_root + url
			wx.request({
				url: _url,
				data: data,
				method: 'GET',
				header: {
					'content-type': 'application/json' // 默认值
				},
				success: function (res) {
					if (res.statusCode == 200) {
						resolve(res)
					} else {
						reject(res)
					}
				}
			})
		}
	) 
}



module.exports = {
	POST, GET
}