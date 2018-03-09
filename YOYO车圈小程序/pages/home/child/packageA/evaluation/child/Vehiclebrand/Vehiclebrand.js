// pages/home/child/packageA/evaluation/child/Vehiclebrand/Vehiclebrand.js
import Brand from '../resource/carbrand.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
	  List: null,
	  viewLetter:null,
	  Scrolltop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  this.CreatList()
	  this.CreatChooseList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //创建选择列表
  CreatChooseList(){
	  const letters = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
	  this.setData({
		  letters: letters
	  })
  },
  //获取品牌列表
  CreatList(){
	  let List = Brand.carbrand.result, result = [],  idx=0
	  let KEYS=[],VALUES=[]

	  //为每一项添加图片编号
	  for (var key in List){
		  List[key].forEach((item,i)=>{
			  if (!this.selectNotshow(item.big_ppname)){
				  result.push({
					id:item.id,
					big_ppname:item.big_ppname,
					idx: idx,
					pin: item.pin
				  })
				  idx++
			  }else{
				  idx++
				  return false
			  }
		  })
	  }

	 //成成KEYS列表
	  for (var key in List) {
		  KEYS.push({
			  key:key,
			  list:[]
		  })
	  }

	 // 生成使用的列表
	KEYS.forEach((_item,_i)=>{
		result.forEach((item, i)=>{
			if (_item.key == item.pin){
				KEYS[_i].list.push(item)
			}
		})
	})
	this.setData({
		List: KEYS
	})
  },

  //把不需显示的剔除出来
  selectNotshow(name){
	  let result = false
	  let notShow = ['奥克斯汽车', '航天圆通', 'Jayco', '解放', '佳星', '庆铃', 'SPRINGO', '赛宝', '萨博', '通用', '万丰', '新雅途', '西安奥拓', '云雀', '扬子', '中顺', '中欧']
	  for (let i = 0; i < notShow.length;i++){
		  if (name == notShow[i]){
			  result = true
			  break;
		  }
	  }
	  return result
  },
  
  //右侧选择按键
  SrcollLetterStart(e){
	  let id = '#'+ e.currentTarget.dataset.letter
	  this.setData({
		  viewLetter: e.currentTarget.dataset.letter
	  })
	  wx.createSelectorQuery().selectViewport('#brandListWrap').scrollOffset(res=> {
		  this.setData({
			  Scrolltop: res.scrollTop
		  })
	  }).exec()
	  wx.createSelectorQuery().select(id).boundingClientRect( (res) =>{
		  let Scrolltop = this.data.Scrolltop
		  Scrolltop += res.top
		  wx.pageScrollTo({
			  scrollTop: Scrolltop,
			  duration:0
		  })
	  }).exec()
  },
  SrcollLetterEnd(e){
	  this.setData({
		  viewLetter: null
	  })
  }
})