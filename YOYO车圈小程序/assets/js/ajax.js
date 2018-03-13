const POST = (url,data={})=> {
	return new Promise((resolve, reject)=>{
		let _url = null;
    let _data = data || {};
		let Info = wx.getStorageSync('yfsdmember') || false
		if (Info) {
			_data.userid = JSON.parse(Info).bMemberid || ''
		}
		_url = url.indexOf('http') != -1 ? url : getApp().globalData.url_root + url;
    getSession((session_id) => {
      _data.sessionId = session_id;
      wx.request({
        url: _url,
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
    });
	})
}

const GET = (url, data={})=> {
	return new Promise(
		(resolve, reject) => {
			let _url = null
			let _data = data || {};
			let Info =wx.getStorageSync('yfsdmember')||false
			if (Info) {
				data.userid = JSON.parse(Info).bMemberid || ''
			}
			_url = url.indexOf('http') != -1 ? url : getApp().globalData.url_root + url;
      getSession((session_id)=>{
        _data.sessionId = session_id;
        wx.request({
          url: _url,
          data: _data,
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
      });
		}
	) 
}

//获取sessionid
function getSession(fn){
  wx.request({
    url: getApp().globalData.url_root+'commonAction/getSessionId',
    success(res) {
      if (res.statusCode == 200) {
        fn(res.data);
      }
    }
  });
}



module.exports = {
	POST, GET
}
