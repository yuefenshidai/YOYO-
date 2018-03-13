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
		  prevData:{
			  id: options.id,
			  imgid: options.imgid
		  }
	  })
	  this.getList()
  },
  getList(){
	  wx.showNavigationBarLoading()
	  ajax.GET('SecondCar/getseries',{
		  brand: this.data.prevData.id
	  }).then(res=>{
		  wx.hideNavigationBarLoading()
		  this.creatList(res.data.result.pinpai_list)
	  })
  },
  creatList(data){
	// console.log(data)
	let _list = []
	data.forEach((item,i)=>{
		_list.push({
			key: item.ppname,
			list: []
		})
	})
	data.forEach((item, i) => {
		item.xilie.forEach((_item,i)=>{
			_list.forEach((el,idx)=>{
				if (el.key == item.ppname){
					el.list.push({
						id: _item.xlid,
						big_ppname: _item.xlname,
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